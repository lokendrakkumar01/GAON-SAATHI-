const VoiceAssistant = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-800 mb-6 text-center">आवाज सहायक</h1>
      <div className="card text-center py-12">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg mb-4">बोलकर अपना काम बताएं</p>
        <button className="btn-primary">माइक्रोफोन शुरू करें</button>
        <p className="text-gray-500 mt-4 text-sm">वेब स्पीच API सपोर्ट के आधार पर काम करेगा</p>
      </div>
    </div>
  );
};
export default VoiceAssistant;
