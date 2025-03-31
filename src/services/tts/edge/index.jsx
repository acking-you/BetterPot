import { invoke } from '@tauri-apps/api/tauri'

export async function tts(text, lang, options = {}) {
    const { config } = options;

    // `requestPath` will be used as voice short name id in ms edge tts
    let { requestPath = 'auto' } = config;

    if (requestPath.length === 0) {
        requestPath = 'auto';
    }
    const is_auto = requestPath.startsWith('auto');

    if (is_auto) {
        if (lang == "en") {
            if (!requestPath.includes("en")) {
                if (requestPath.includes("option1"))
                    requestPath = "en-US-ChristopherNeural";
                else if (requestPath.includes("option2"))
                    requestPath = "en-US-JennyNeural";
                else
                    requestPath = "en-US-EmmaNeural";
            }
        } else if (lang == "zh") {
            if (!requestPath.includes("zh"))
                requestPath = "zh-CN-XiaoxiaoNeural";
        } else {
            requestPath = "en-US-JennyNeural";
        }
    }

    if (is_auto) {
        return await invoke('get_edge_tts_voice_data_and_play', {
            voiceShortId: requestPath,
            text: text,
        });
    } else {
        return await invoke('get_edge_tts_voice_data', {
            voiceShortId: requestPath,
            text: text,
        });

    }
}

export * from './Config';
export * from './info';
