import { GoogleGenAI, Chat, Type } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
你是「源利交通股份有限公司 (Yuan Li Transportation)」的 AI 智慧客服，名字叫「小源」。
源利交通成立於 1972 年，總部位於高雄，擁有超過 50 年運輸經驗與 80+ 輛專業車隊，服務範圍涵蓋全台灣。
你的任務是親切、專業地引導客戶完成貨運詢價。

請依照以下 8 個步驟**循序漸進**地詢問客戶，一次只問一個問題：

1. **起運地**：請問貨物要從哪裡出發呢？（例如：台北市、高雄港、仁武工業區）
2. **目的地**：了解！那目的地是哪裡呢？（例如：台中市、台南科學園區）
3. **貨物類型**：請問是什麼類型的貨物呢？
   (1. 一般貨物 / 2. 精密儀器 / 3. 大型設備 / 4. 其他-請說明)
4. **重量/體積**：了解！請問貨物的大約重量或數量？（例如：2噸、5個棧板、整車）
5. **車型需求**：根據您的需求，我建議使用合適的車型（如 3.5噸、大貨車、氣墊車）。
   您也可以選擇：(1. 接受建議 / 2. 查看其他車型 / 3. 讓專業人員評估)
6. **期望時間**：請問您期望的取貨或送達時間？（例如：本週五、下週二、儘快）
7. **特殊需求**：有沒有特殊需求？
   (例如：需要尾門裝卸、需要堆高機、需要多點配送、或是沒有特殊需求)
8. **聯絡資訊**：太好了！最後請留下您的聯絡方式：
   (姓名、公司名稱-選填、電話、Email)

**對話規則：**
- 語氣要溫暖、穩重、值得信賴（使用繁體中文）。
- 強調我們「高雄出發、服務全台」的優勢。
- 若客戶詢問精密儀器，請主動提及我們有專業的「氣墊車隊」。
- 當所有資訊收集完成後，請輸出一個總結摘要，格式如下：

「✅ 您的詢價資訊已送出！

📋 **詢價摘要**：
- 起運地：[... ]
- 目的地：[... ]
- 貨物類型：[... ]
- 重量/數量：[... ]
- 車型需求：[... ]
- 期望時間：[... ]
- 特殊需求：[... ]
- 聯絡資訊：[... ]

我們的業務團隊會在 24 小時內與您聯繫報價。
感謝您選擇源利交通！
貨物配送專線：07-3757599」

開場白請說：「您好！我是小源 😊 讓我幫您快速取得運輸報價！請問貨物要從哪裡出發呢？」
`;

let chatSession: Chat | null = null;

export const startChatSession = (): Chat => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.5, // Lower temperature for more consistent/professional responses
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    startChatSession();
  }

  try {
    const response = await chatSession!.sendMessage({ message });
    return response.text || "抱歉，我目前無法回應，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系統發生錯誤，請稍後再試，或直接聯繫我們的客服專線 07-3757599。";
  }
};

export const resetChatSession = () => {
  chatSession = null;
};

// Email Analysis Function
export const analyzeEmail = async (emailText: string) => {
  const prompt = `
  請作為一位專業的物流業務助理，分析以下客戶詢價郵件，提取運輸需求並以 JSON 格式回傳。
  
  郵件內容：
  ${emailText}

  分析重點：
  1. 識別並過濾「客戶的上游訂單資訊」，只提取與「實際運輸」相關的資訊。
  2. 產品規格、價格、付款條件等商業資訊都屬於無關資訊。
  3. 特別注意時間的緊迫性。
  4. 精密貨物建議氣墊車；大型貨物建議歐翼車；出口貨物注意報關需求。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.OBJECT,
              properties: {
                sender: { type: Type.STRING },
                subject: { type: Type.STRING },
                type: { type: Type.STRING, description: "運輸類型 (國內運輸/出口運輸/展覽運輸/精密運輸)" },
                urgency: { type: Type.STRING, enum: ["低", "中", "高"] },
                urgencyReason: { type: Type.STRING }
              }
            },
            customer: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                contactPerson: { type: Type.STRING },
                phone: { type: Type.STRING },
                email: { type: Type.STRING },
                mobile: { type: Type.STRING }
              }
            },
            shipping: {
              type: Type.OBJECT,
              properties: {
                originCity: { type: Type.STRING },
                originAddress: { type: Type.STRING },
                destCity: { type: Type.STRING },
                destAddress: { type: Type.STRING },
                destPort: { type: Type.STRING },
                cargoType: { type: Type.STRING },
                cargoDescription: { type: Type.STRING },
                totalBoxes: { type: Type.STRING },
                totalPallets: { type: Type.STRING },
                palletSize: { type: Type.STRING },
                palletWeight: { type: Type.STRING },
                totalWeight: { type: Type.STRING },
                pickupDate: { type: Type.STRING },
                pickupTime: { type: Type.STRING },
                deliveryDate: { type: Type.STRING },
                deliveryTime: { type: Type.STRING },
                deadline: { type: Type.STRING }
              }
            },
            requirements: {
              type: Type.OBJECT,
              properties: {
                vehicleType: { type: Type.STRING },
                vehicleReason: { type: Type.STRING },
                specialNeeds: { type: Type.ARRAY, items: { type: Type.STRING } },
                equipment: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            filteredInfo: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            workflow: {
              type: Type.OBJECT,
              properties: {
                stage: { type: Type.STRING },
                assignTo: { type: Type.STRING },
                assistDepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                estimatedPrice: { type: Type.STRING },
                estimatedVehicles: { type: Type.STRING }
              }
            },
            aiNotes: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Email Analysis Error:", error);
    throw error;
  }
};
