"use client";

const AboutUs = () => {
  const location = "V8F8+6M Paris, France";

  return (
    <div className="w-full flex justify-center flex-col items-center sm:items-start sm:flex-row mt-36 space-x-0 px-4  sm:space-x-10 mb-10">
      <div className="flex flex-col">
        <div className="w-80 h-80 ">
          <iframe
            className="w-80 h-80 rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2189364946053!2d2.3144302419797746!3d48.87310274252804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x66ae4097ff6609bd!2sV8F8%2B6M!5e0!3m2!1str!2suk!4v1697876240547!5m2!1str!2suk"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex justify-between px-3 py-3 mt-10 rounded-lg">
          <p className="text-gray-400 text-xs">Office</p>
          <p className="text-white text-xs">
            10 Rue de Penthièvre, 75008 Paris
          </p>
        </div>
        <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
          <p className="text-gray-400 text-xs">Phone</p>
          <p className="text-white text-xs">+33 6 52 76 43 50</p>
        </div>
        <div className="flex justify-between px-3 py-3 rounded-lg">
          <p className="text-gray-400 text-xs">Email</p>
          <p className="text-white text-xs">info@mediaverse.land</p>
        </div>
        {/* <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
                <p className="text-gray-400 text-xs">Gmail</p>
                <p className="text-white text-xs">Mediaverse.land@gmail.com</p>
            </div> */}
        <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
          <p className="text-gray-400 text-xs">Youtube</p>
          <p className="text-white text-xs">Mediaverseland</p>
        </div>
        <div className="flex justify-between px-3 py-3 rounded-lg">
          <p className="text-gray-400 text-xs">Instagram</p>
          <p className="text-white text-xs">Mediaverse.land</p>
        </div>
        <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
          <p className="text-gray-400 text-xs">Facebook</p>
          <p className="text-white text-xs">MehrdadRashidian </p>
        </div>
        <div className="flex justify-between px-3 py-3 rounded-lg">
          <p className="text-gray-400 text-xs">Linkedin</p>
          <p className="text-white text-xs">Mediaverse-land</p>
        </div>
        <div className="flex justify-between px-3 py-3 rounded-lg bg-[#0F0F66]">
          <p className="text-gray-400 text-xs">X</p>
          <p className="text-white text-xs">Mediaverseland</p>
        </div>
      </div>
      <div>
        <h1 className="text-white text-4xl mt-8 sm:mt-0">About us</h1>
        <p className="text-white w-full sm:w-[650px] mt-6">
          Mediaverse is a privately owned company based in Paris, France. The
          company started its operations in 2019, primarily dealing in audio and
          video products. As technology advanced, Mediaverse shifted its focus
          towards providing a platform that specializes in managing the content
          cycle.
        </p>
        <p className="text-white text-xl mt-8">Audiences</p>
        <p className="text-sm text-white w-full sm:w-[650px]">
          Mediaverse is designed to cater to non-professional and
          semi-professional users. It acts as a bridge between traditional
          content production, such as TV and radio, and new generative
          artificial intelligence tools. The platform offers a range of tools to
          users, from the initial stages of content production, such as using
          microphones and cameras, to production through generative artificial
          intelligence and even purchasing content from others. The platform
          also offers services to publish the content on social TV and social
          networks.
        </p>
        <p className="text-white text-xl mt-8">Contact Us</p>
        <p className="text-white w-full sm:w-[650px]">
          Mediaverse's primary audience includes anyone interested in generating
          income from content, such as social content managers of television
          channels, bloggers, branding experts of companies, and even
          housewives. We welcome you to use our platform and services and share
          your opinions and suggestions through our contact numbers or social
          network IDs. Our team is available 24/7 to respond to your queries,
          help you use our services, and solve any problems you may face while
          using the platform.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
