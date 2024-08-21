import {Link} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";


export default function Contact() {
    return(
        <div className="flex items-center justify-center">
            <div className="bg-black text-white p-4">
                <h4 className="text-lg font-semibold">Kayla Dale</h4>
                <h4 className="text-lg">kdale@mail.mccneb.edu</h4>
                <h4 className="text-lg">(402)-981-3107</h4>
                <div className="mt-4 flex items-center justify-center space-x-4">
                    <Link href="https://www.linkedin.com/in/kayla-dale-336521253/" target="_blank"
                          rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className="text-white text-5xl"/>
                    </Link>
                    <a href="https://github.com/KDale119" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="text-white text-5xl"/>
                    </a>
                </div>
            </div>
        </div>
    )
}