const path = require('path')
module.exports = {
  version: "1.5",
  title: "Openvoice2",
  description: "Openvoice 2 Web UI - A local web UI for Openvoice2, a multilingual voice cloning TTS https://x.com/myshell_ai/status/1783161876052066793",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "English",
          href: "start.js",
          params: {
            install: "pip uninstall -y mecab-python3 python-mecab-ko && pip install -U mecab-python3==1.0.5",
            run: "python app.py EN"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Spanish",
          href: "start.js",
          params: {
            install: "pip uninstall -y mecab-python3 python-mecab-ko && pip install -U mecab-python3==1.0.5",
            run: "python app.py ES"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "French",
          href: "start.js",
          params: {
            install: "pip uninstall -y mecab-python3 python-mecab-ko && pip install -U mecab-python3==1.0.5",
            run: "python app.py FR"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Chinese",
          href: "start.js",
          params: {
            install: "pip uninstall -y mecab-python3 python-mecab-ko && pip install -U mecab-python3==1.0.5",
            run: "python app.py ZH"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Korean",
          href: "start.js",
          params: {
            install: (() => {
              if (kernel.platform === "win32") {
                return "pip uninstall -y mecab-python3 && pip install -U eunjeon"
              } else {
                return "pip uninstall -y mecab-python3 && pip install -U python-mecab-ko"
              }
            })(),
            run: "python app.py KR"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Japanese",
          href: "start.js",
          params: {
            install: "pip uninstall -y mecab-python3 python-mecab-ko && pip install -U mecab-python3==1.0.5",
            run: "python app.py JP"
          }
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
