import { Mic, ShoppingBag, FileText, BookOpen, Briefcase, ArrowRight } from '../components/Icons';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    { icon: <Mic className="h-8 w-8" />, title: 'आवाज सहायक', desc: 'बोलकर अपना काम बताएं', link: '/voice-assistant', color: 'bg-blue-500' },
    { icon: <ShoppingBag className="h-8 w-8" />, title: 'गाँव बाजार', desc: 'स्थानीय सामान खरीदें-बेचें', link: '/marketplace', color: 'bg-green-500' },
    { icon: <FileText className="h-8 w-8" />, title: 'हेल्प डेस्क', desc: 'शिकायत दर्ज करें', link: '/help-desk', color: 'bg-orange-500' },
    { icon: <BookOpen className="h-8 w-8" />, title: 'शिक्षा साथी', desc: 'पढ़ाई और संसाधन', link: '/education', color: 'bg-purple-500' },
    { icon: <Briefcase className="h-8 w-8" />, title: 'नौकरी & सेवाएं', desc: 'काम खोजें या प्रदान करें', link: '/jobs', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-cream py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary-800 mb-4">
              गाँव की हर जरूरत, अब एक जगह
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              अपने गाँव की अपनी डिजिटल पहचान
            </p>
            <p className="text-lg text-gray-600 mb-10">
              किसानों, छात्रों, दुकानदारों और सभी ग्रामीणों के लिए एक संपूर्ण डिजिटल मंच
            </p>
            
            <Link to="/voice-assistant">
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg flex items-center space-x-2 mx-auto"
              >
                <Mic className="h-6 w-6" />
                <span>बोलकर अपना काम बताएं</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              हमारी सेवाएं
            </h2>
            <p className="text-lg text-gray-600">गाँव की सभी जरूरतों के लिए एक प्लेटफॉर्म</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
              >
                <Link to={service.link} className="card block h-full">
                  <div className={`${service.color} text-white p-3 rounded-lg w-fit mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <div className="flex items-center text-primary-600 font-medium">
                    <span>जानें अधिक</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">कैसे काम करता है?</h2>
            <p className="text-lg text-gray-600">बस 3 आसान चरणों में शुरू करें</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'पंजीकरण करें', desc: 'मुफ्त में अपना खाता बनाएं' },
              { step: '2', title: 'सेवा चुनें', desc: 'जो जरूरत हो उसे चुनें' },
              { step: '3', title: 'कार्रवाई करें', desc: 'बोलकर या क्लिक करके काम शुरू करें' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
