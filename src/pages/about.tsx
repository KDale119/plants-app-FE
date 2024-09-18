import Image from "next/image";

export default function About() {
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center mb-6">
                    <h4 className="text-2xl font-semibold text-white">Kayla Dale</h4>
                </div>
                <div
                    className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0">
                    <div className="w-72 h-72">
                        <Image
                            src="/images/headshot.jpg"
                            alt="Kayla Dale"
                            height={400}
                            width={400}
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div className="flex-1 text-white-700 leading-relaxed max-w-md">
                        <p>
                            Hi, I&apos;m Kayla Dale, and I&apos;ve been thriving as a Technical Specialist at Mutual of Omaha
                            since coming
                            into the role in April this year. While working here, I&apos;ve had the opportunity
                            to apply and expand my skills in various ways. However, the highlight of my journey was
                            developing this Next.js
                            application with a Java CRUD backend during my time in code school. This project was a
                            significant
                            milestone in my learning experience, showcasing my ability to build and integrate complex
                            systems.
                            I&apos;m deeply grateful for the solid foundation that code school provided, which has been
                            instrumental
                            in my professional growth and success.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}