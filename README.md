# Theme Center · 次世代智能中控主题套件

[English](README.en.md) | **简体中文** | [更新日志](CHANGELOG.md)

[![最新版本](https://img.shields.io/github/v/release/deltrivx/ThemeCenter?display_name=tag&sort=semver&label=最新版本)](https://github.com/deltrivx/ThemeCenter/releases/latest)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue?logo=home-assistant&logoColor=white)](https://www.home-assistant.io/)
[![代码许可](https://img.shields.io/badge/代码许可-GPL--2.0-blue)](LICENSE)
[![设计规范](https://img.shields.io/badge/视觉体系-Liquid%20Glass-8a2be2)](docs/DESIGN.md)

面向 Home Assistant 的通用次世代 3D / 液态毛玻璃智能中控主题与自动化卡片生成脚手架。提供高质感 3D 户型可视化、流体环境光晕、物理态交互卡片以及**基于设备实体一键生成专属仪表盘**的智能脚手架。

![Theme Center 3D PC 预览](assets/pc-preview.png)

> 当前正式版：**v1.0.0** · 兼容系统：**Home Assistant 2024.1+**（Core / Container / OS）

---

## 核心特性

| 特性 | 说明 |
|---|---|
| 🌌 **次世代视觉** | 深度结合 WebGL 3D 空间立体投影与液态拟物毛玻璃（Liquid Glass），呈现极具未来感的智能中控界面。 |
| 🪄 **智能脚手架** | **零手写配置**：自动扫描本机的区域与实体（空调、温湿度、灯光、窗帘、多媒体），一键生成专属定制化仪表盘。 |
| ⚡ **性能档位自适应** | 延续 ThemeEffects 工业级分级引擎（`Ultra / High / Balanced / Low-Power`），百元壁挂平板到旗舰 iPad 皆可流畅 60fps。 |
| 🛡️ **双向零侵入架构** | 原生主题与新版中控无缝互切；完全隔离侧边栏与系统默认设置，绝不污染或篡改 HA 原生环境。 |
| 📦 **开箱即用** | 支持 HACS 自定义存储库导入与 Shell 终端一行命令 OTA 安装。 |

---

## 快速安装

### 方式一：HACS 极简导入（推荐）
1. 打开 Home Assistant 的 **HACS** 页面；
2. 点击右上角菜单 → **自定义存储库（Custom repositories）**；
3. 输入 `https://github.com/deltrivx/ThemeCenter`，类别选择 **Lovelace (Dashboard)**；
4. 点击下载并刷新页面即可。

### 方式二：终端一行 OTA 安装
在 Home Assistant 宿主机或容器终端中执行：
```bash
curl -fsSL https://raw.githubusercontent.com/deltrivx/ThemeCenter/main/scripts/install.sh | bash
```

安装脚本会自动检测配置路径、注入组件引用并完成模块热加载。

---

## 智能脚手架使用指南

安装完成后，打开中控页面：
1. 点击右上角「⚙️ 智能生成」按钮；
2. 系统将通过 WebSocket 自动发现您当前的 `area_registry`（客厅、主卧、次卧、厨房等）及绑定的有效实体；
3. 勾选需要呈现的设备类型（如空调、环境传感器、灯光组）；
4. 点击「生成仪表盘」，即可自动为您编译出与本仓库完全同款风格的卡片矩阵与房间视图。

---

## 性能分级机制 (PERF_PROFILE)

在中控设置中可调节性能档位：
- **Ultra / High**：开启实时点光源投影、动态粒子与高斯模糊背景（适合 PC、最新 iPad、高性能手机）；
- **Balanced**：收敛模糊半径与动画帧率，采用硬件加速层（适合常见 Android 壁挂屏）；
- **Low-Power**：禁用 3D 旋转与高开销模糊，使用纯拟物液态卡片（适合低功耗中控屏）。

---

## 规范与致谢

- 核心架构灵感源自 [ThemeEffects](https://github.com/deltrivx/ThemeEffects) 的无侵入式与自适应设计理念；
- 基于 Home Assistant WebSocket API 构建。
