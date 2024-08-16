import Image from "next/image";

export default function About() {
    return(
        <>
            <div>
        {/*image here*/}
            </div>
            <div className="text-center mb-6">
                <h4 className="text-2xl font-semibold text-white-800">Kayla Dale</h4>
            </div>
            <div className="flex justify-end p-4">
                <p className="text-white-700 leading-relaxed max-w-md">
                    Hi, I'm Kayla Dale, and I’ve been thriving as a Technical Specialist at Mutual of Omaha since coming
                    into the role in April this year. While working here, I’ve had the opportunity
                    to apply and expand my skills in various ways. However, the highlight of my journey was developing a Next.js
                    application with a Java CRUD backend during my time in code school. This project was a significant
                    milestone in my learning experience, showcasing my ability to build and integrate complex systems.
                    I’m deeply grateful for the solid foundation that code school provided, which has been instrumental
                    in my professional growth and success.
                </p>
            </div>
        </>
    )
}