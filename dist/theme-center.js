/**
 * ThemeCenter - Universal 3D Glassmorphism Control Center & Smart Scaffolder
 * https://github.com/deltrivx/ThemeCenter
 * (C) 2026 DeltrivX
 */

(() => {
  console.log("%c[ThemeCenter]%c Universal Smart Home Suite v1.0.0 Loaded", "color:#00e5ff;font-weight:bold", "color:auto");

  // 1. 性能分级机制 (PERF_PROFILE)
  const PERF_PROFILE = localStorage.getItem("theme_center_perf") || "auto";

  // 2. 智能脚手架：自动探测实体并生成适配卡片
  class SmartScaffolder {
    constructor(hass) {
      this.hass = hass;
    }

    async scanEntities() {
      if (!this.hass) return [];
      const states = this.hass.states || {};
      const categorized = {
        climate: [],
        lights: [],
        sensors: [],
        media: [],
        switches: []
      };

      for (const [entityId, stateObj] of Object.entries(states)) {
        const domain = entityId.split(".")[0];
        if (domain === "climate") categorized.climate.push(stateObj);
        else if (domain === "light") categorized.lights.push(stateObj);
        else if (domain === "media_player") categorized.media.push(stateObj);
        else if (domain === "switch") categorized.switches.push(stateObj);
        else if (domain === "sensor" && (entityId.includes("temp") || entityId.includes("hum"))) {
          categorized.sensors.push(stateObj);
        }
      }
      return categorized;
    }

    generateDashboardConfig(categorized) {
      return {
        title: "3D 智能中控",
        views: [
          {
            title: "全屋中控",
            path: "home",
            type: "custom:theme-center-view",
            badges: [],
            cards: [
              {
                type: "custom:theme-center-3d-card",
                climate_entities: categorized.climate.map(e => e.entity_id),
                light_entities: categorized.lights.map(e => e.entity_id),
                sensor_entities: categorized.sensors.map(e => e.entity_id)
              }
            ]
          }
        ]
      };
    }
  }

  // 3. 注册通用卡片与脚手架工具
  customElements.define("theme-center-3d-card", class extends HTMLElement {
    set hass(hass) {
      this._hass = hass;
      if (!this._scaffolder) {
        this._scaffolder = new SmartScaffolder(hass);
      }
      this.render();
    }

    setConfig(config) {
      this._config = config;
    }

    render() {
      if (this._rendered) return;
      this._rendered = true;
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            border-radius: 24px;
            background: rgba(20, 24, 35, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
            padding: 24px;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .title {
            font-size: 20px;
            font-weight: 600;
            background: linear-gradient(135deg, #fff, #90caf9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .btn-scan {
            background: linear-gradient(135deg, #00b4db, #0083b0);
            border: none;
            border-radius: 12px;
            padding: 8px 16px;
            color: #fff;
            cursor: pointer;
            font-weight: 500;
          }
          .status {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
          }
        </style>
        <div class="header">
          <div class="title">ThemeCenter 智能中控</div>
          <button class="btn-scan" id="btn-scan">🪄 扫描并生成专属卡片</button>
        </div>
        <div class="status" id="status">就绪 · 点击按钮根据当前设备自动生成布局</div>
      `;

      this.shadowRoot.getElementById("btn-scan").addEventListener("click", async () => {
        const statusEl = this.shadowRoot.getElementById("status");
        statusEl.innerText = "正在分析当前系统实体与空间绑定...";
        const data = await this._scaffolder.scanEntities();
        const conf = this._scaffolder.generateDashboardConfig(data);
        console.log("[ThemeCenter] Generated Dashboard Config:", conf);
        statusEl.innerText = `扫描完成！识别到 ${data.climate.length} 台温控、${data.lights.length} 盏灯光、${data.sensors.length} 个传感器。专属中控布局已就绪！`;
      });
    }
  });

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "theme-center-3d-card",
    name: "ThemeCenter 3D 智能中控卡片",
    description: "具备液态毛玻璃与自动实体扫描脚手架的通用中控组件"
  });
})();
