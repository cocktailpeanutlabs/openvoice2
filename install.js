module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        env: {
          "GIT_CLONE_PROTECTION_ACTIVE": "false"
        },
        message: [
          //"git clone https://huggingface.co/spaces/cocktailpeanut/ov2 app",
          "git lfs install",
          "git clone https://github.com/cocktailpeanut/ov2 app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        env: {
          "GIT_CLONE_PROTECTION_ACTIVE": "false"
        },
        message: [
          "git lfs install",
          "git clone --depth 1 https://huggingface.co/cocktailpeanut/ov2 checkpoints"
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "{{platform === 'darwin' ? 'brew install mecab' : null}}",
          "pip install gradio==3.50.2 devicetorch",
          "pip install git+https://github.com/myshell-ai/OpenVoice.git",
          "pip install git+https://github.com/peanutcocktail/MeloTTS.git",
          "python -m unidic download",
          "pip install whisper-timestamped==1.15.4",
        ]
      }
    },
    //  Uncomment this step to add automatic venv deduplication (Experimental)
    //  {
    //    method: "fs.link",
    //    params: {
    //      venv: "app/env"
    //    }
    //  },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
