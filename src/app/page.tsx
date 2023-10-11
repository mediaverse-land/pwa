import Image from "next/image";

const Home = () => {
  return (<div className="h-screen">
    <Image src="/images/media-verse-background-image.png"
      height={1000}
      width={460}
      alt="background Image"
      className="absolute top-4 -z-10 "
      quality={100}
    />
  </div>

  );
}

export default Home;