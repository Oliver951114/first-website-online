import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic, language } = await request.json();

    const prompt = `請根據以下主題和語言，生成4個相關的單字及其中文翻譯。
主題：${topic}
語言：${language}

請以JSON格式回覆，格式如下：
{
  "單字清單": ["單字1", "單字2", "單字3", "單字4"],
  "單字中文意義清單": ["中文1", "中文2", "中文3", "中文4"]
}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "你是一個專業的語言學習助手，專門提供單字聯想服務。請確保回覆格式正確，且只提供4個相關單字。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '處理請求時發生錯誤' },
      { status: 500 }
    );
  }
}
