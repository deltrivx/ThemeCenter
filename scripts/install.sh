#!/usr/bin/env bash
# ==============================================================================
# ThemeCenter Installation Script
# https://github.com/deltrivx/ThemeCenter
# ==============================================================================
set -e

GREEN="\033[0;32m"
BLUE="\033[0;34m"
NC="\033[0m"

echo -e "${BLUE}=== 正在安装 ThemeCenter (次世代智能中控套件) ===${NC}"

# 检测 Home Assistant 配置路径
CONFIG_DIR=""
for p in "/config" "/mnt/user/appdata/homeassistant/config" "$HOME/homeassistant"; do
    if [ -f "$p/configuration.yaml" ]; then
        CONFIG_DIR="$p"
        break
    fi
done

if [ -z "$CONFIG_DIR" ]; then
    echo "未找到 Home Assistant 配置目录，请手动指定 CONFIG_DIR。"
    exit 1
fi

echo "目标配置目录: $CONFIG_DIR"
mkdir -p "$CONFIG_DIR/www/theme-center"

# 下载核心产物
BASE_URL="https://raw.githubusercontent.com/deltrivx/ThemeCenter/main/dist"
curl -fsSL "$BASE_URL/theme-center.js" -o "$CONFIG_DIR/www/theme-center/theme-center.js"

# 检查 configuration.yaml 引用
if ! grep -q "/local/theme-center/theme-center.js" "$CONFIG_DIR/configuration.yaml"; then
    echo "正在注入前端模块配置..."
    sed -i "/frontend:/a\  extra_module_url:\n    - /local/theme-center/theme-center.js" "$CONFIG_DIR/configuration.yaml"
fi

echo -e "${GREEN}✓ ThemeCenter 安装成功！请在 Home Assistant 中重启或刷新浏览器。${NC}"
