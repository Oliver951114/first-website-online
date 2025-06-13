import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { word, translation, language } = await request.json();

    const prompt = `請為以下單字生成一個例句：
單字：${word}
中文意義：${translation}
語言：${language}

請注意：
1. 例句必須使用${language}撰寫，不能使用中文
2. 例句要簡單易懂，適合語言學習者使用
3. 例句要自然且實用
4. 請確保例句中使用了指定的單字

請以JSON格式回覆，格式如下：
{
  "example": "這裡放${language}例句"
}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `你是一個專業的${language}語言學習助手。請確保所有例句都使用${language}撰寫，不要使用中文。`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const response = JSON.parse(content);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '處理請求時發生錯誤' },
      { status: 500 }
    );
  }
}
