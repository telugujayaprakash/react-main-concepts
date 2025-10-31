import { Link } from 'react-router-dom'
import UploadMovies from './UploadMovies';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo or Brand Name */}
                <div className="text-2xl font-bold tracking-wide">CineHub</div>

                {/* Navigation Links */}
                <ul className="flex space-x-8 text-lg">
                    <li>
                        <a
                            href="#movies"
                            className="hover:text-yellow-400 transition-colors duration-200"
                        >
                            Movies
                        </a>
                    </li>
                    <li>
                        <a
                            href="#series"
                            className="hover:text-yellow-400 transition-colors duration-200"
                        >
                            Series
                        </a>
                    </li>
                    <li>
                        <a
                            href="#news"
                            className="hover:text-yellow-400 transition-colors duration-200"
                        >
                            News
                        </a>
                    </li>
                    <li>
                        <Link
                            to={'/Event'}
                            className="hover:text-yellow-400 transition-colors duration-200"
                        >
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/UploadMovies'}
                            className="hover:text-yellow-400 transition-colors duration-200"
                        >
                            Upload movies
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
