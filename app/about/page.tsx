export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center text-center px-4 bg-gradient-to-br from-white to-gray-100">
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            關於 Andy的AI Lab
          </h1>
          <p className="text-2xl text-gray-600">
            創新科技，智慧未來
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                我們的使命
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Andy的AI Lab 成立於2024年，致力於推動人工智慧技術的創新與應用。我們相信，AI技術不僅能改變企業的運營方式，更能為社會帶來實質的進步。
              </p>
              <p className="text-lg text-gray-600">
                透過持續的研發與創新，我們為客戶提供最前沿的AI解決方案，幫助企業在數位轉型的浪潮中保持競爭力。
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/600/400?random=11" 
                alt="Company Mission" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            核心價值
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "創新研發",
                description: "持續探索AI技術的前沿，推動技術創新",
                icon: "💡"
              },
              {
                title: "客戶至上",
                description: "深入了解客戶需求，提供最適合的解決方案",
                icon: "🤝"
              },
              {
                title: "品質保證",
                description: "堅持最高標準，確保每個專案的品質",
                icon: "✨"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            專業團隊
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Andy Huang",
                position: "創辦人 & CEO",
                image: "https://picsum.photos/400/400?random=12"
              },
              {
                name: "Sarah Chen",
                position: "技術總監",
                image: "https://picsum.photos/400/400?random=13"
              },
              {
                name: "Mike Lin",
                position: "AI 研究主管",
                image: "https://picsum.photos/400/400?random=14"
              },
              {
                name: "Lisa Wang",
                position: "產品經理",
                image: "https://picsum.photos/400/400?random=15"
              }
            ].map((member, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="relative mb-4 overflow-hidden rounded-full">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            我們的願景
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            成為亞太地區最具影響力的AI技術創新中心，透過持續的技術突破和創新應用，
            為企業和社會創造更大的價值，推動AI技術的普及與發展。
          </p>
          <div className="mt-12">
            <a 
              href="/contact" 
              className="inline-block bg-[#FF7F50] text-white py-3 px-8 rounded-md hover:bg-[#FF6B3D] transition-colors duration-300"
            >
              加入我們
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
