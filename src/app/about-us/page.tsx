
const AboutUs = () => {
    return (<div className="w-full flex justify-center flex-col items-center sm:items-start sm:flex-row mt-36 space-x-0 px-4  sm:space-x-10">
        <div className="flex flex-col">
            <div className="w-80 h-80 bg-cover bg-[url('/images/map.png')]">
            </div>
                <div className="flex justify-between px-3 py-3 mt-10 rounded-lg">
                    <p className="text-gray-400 text-xs">Office</p>
                    <p className="text-white text-xs">10 Rue de Penthièvre, 75008 Paris</p>
                </div>
                <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
                    <p className="text-gray-400 text-xs">Phone</p>
                    <p className="text-white text-xs">+33 6 52 76 43 50</p>
                </div>
                <div className="flex justify-between px-3 py-3 rounded-lg">
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-white text-xs">info@mediaverse.land</p>
                </div>
                <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
                    <p className="text-gray-400 text-xs">Gmail</p>
                    <p className="text-white text-xs">Mediaverse.land@gmail.com</p>
                </div>
                <div className="flex justify-between px-3 py-3 rounded-lg">
                    <p className="text-gray-400 text-xs">X</p>
                    <p className="text-white text-xs">@Mediaverseland</p>
                </div>
                <div className="flex justify-between px-3 py-3 bg-[#0F0F66] rounded-lg">
                    <p className="text-gray-400 text-xs">Youtube</p>
                    <p className="text-white text-xs">@mediaverseland</p>
                </div>
        </div>
        <div>
            <h1 className="text-white text-4xl mt-8 sm:mt-0">About us</h1>
            <p className="text-white w-full sm:w-[650px] mt-6">The Instagram Basic Display API allows users of your app to get basic profile information, photos, and videos in their Instagram accounts.
                The API can be used to access any type of Instagram account but only provides read-access to basic data. If you are building an app that will allow Instagram Businesses or Creators to publish media, moderate comments, identify @mentioned and hashtagged media, or get data about other Instagram users, use the Instagram Graph API instead.
            </p>
            <p className="text-white text-xl mt-8">Common Uses</p>
            <ul className="text-white list-disc text-xs">
                <li>Get an Instagram User Access Token and permissions from an Instagram user</li>
                <li>Get an Instagram user’s profile</li>
                <li>Get an Instagram user’s images, videos, and albums</li>
            </ul>
            <p className="text-white text-xl mt-8">Limitations</p>
            <ul className="text-white list-disc text-xs w-full sm:w-[650px]">
                <li>Authentication — Instagram Basic Display is not an authentication solution. Data returned by the API cannot be used to authenticate your app users or log them into your app. If you need an authentication solution we recommend using Facebook Login instead.</li>
                <li>App Types — Apps designated as Business apps are not supported. If your app is a Business app use the Instagram Graph API instead or create a new non-Business app.</li>
                <li>Legacy IDs — Instagram Legacy API User IDs are not supported.</li>
                <li>Unsupported Media — IGTV, Stories, Reels, and Comments are not supported.</li>
                <li>Promoted Posts — Promoted Posts containing Instagram media are not supported.</li>
                <li>Insights — Insights are not supported.</li>
            </ul>
            <p className="text-white text-xl mt-8">Documentation Contents</p>
            <ul className="text-white text-xs">
                <li>Overview</li>
                <li>Explanations of core concepts and usage requirements.</li>
                <li>Get Started</li>
                <li>A short tutorial to get you up and running.</li>
                <li>Guides</li>
                <li>Use case based guides to help you perform specific actions.</li>
                <li>Reference</li>
                <li>Component and endpoint references.</li>
                <li>See Also</li>
                <li>Instagram Graph API</li>
            </ul>
            {/* Fake */}
            <p className="text-white text-xl mt-8">Common Uses</p>
            <ul className="text-white list-disc text-xs">
                <li>Get an Instagram User Access Token and permissions from an Instagram user</li>
                <li>Get an Instagram user’s profile</li>
                <li>Get an Instagram user’s images, videos, and albums</li>
            </ul>
            <p className="text-white text-xl mt-8">Limitations</p>
            <ul className="text-white list-disc text-xs w-full sm:w-[650px]">
                <li>Authentication — Instagram Basic Display is not an authentication solution. Data returned by the API cannot be used to authenticate your app users or log them into your app. If you need an authentication solution we recommend using Facebook Login instead.</li>
                <li>App Types — Apps designated as Business apps are not supported. If your app is a Business app use the Instagram Graph API instead or create a new non-Business app.</li>
                <li>Legacy IDs — Instagram Legacy API User IDs are not supported.</li>
                <li>Unsupported Media — IGTV, Stories, Reels, and Comments are not supported.</li>
                <li>Promoted Posts — Promoted Posts containing Instagram media are not supported.</li>
                <li>Insights — Insights are not supported.</li>
            </ul>
            <p className="text-white text-xl mt-8">Documentation Contents</p>
            <ul className="text-white text-xs">
                <li>Overview</li>
                <li>Explanations of core concepts and usage requirements.</li>
                <li>Get Started</li>
                <li>A short tutorial to get you up and running.</li>
                <li>Guides</li>
                <li>Use case based guides to help you perform specific actions.</li>
                <li>Reference</li>
                <li>Component and endpoint references.</li>
                <li>See Also</li>
                <li>Instagram Graph API</li>
            </ul>
        </div>
    </div>);
}

export default AboutUs;