import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const { text, language } = await request.json();

    // 根據語言選擇適當的語音
    let voice = 'alloy'; // 預設語音
    if (language === '日文') voice = 'nova';
    else if (language === '韓文') voice = 'echo';
    else if (language === '法文') voice = 'fable';
    else if (language === '德文') voice = 'onyx';

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');

    // 在伺服器端印出 base64 字串
    console.log('Generated base64 audio:', base64Audio);

    return NextResponse.json({ audio: base64Audio });
  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
