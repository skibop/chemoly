import Link from "next/link"
import { Twitter, Linkedin, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">PlasticInfo</h3>
            <p className="text-white/70">
              Comprehensive information about plastics, their environmental impact, and sustainable solutions.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Plastic Types</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/plastics/type-1" className="text-white/70 hover:text-white">
                  PET (Type #1)
                </Link>
              </li>
              <li>
                <Link href="/plastics/type-2" className="text-white/70 hover:text-white">
                  HDPE (Type #2)
                </Link>
              </li>
              <li>
                <Link href="/plastics/type-3" className="text-white/70 hover:text-white">
                  PVC (Type #3)
                </Link>
              </li>
              <li>
                <Link href="/plastics/type-4" className="text-white/70 hover:text-white">
                  LDPE (Type #4)
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/formation" className="text-white/70 hover:text-white">
                  Plastic Formation
                </Link>
              </li>
              <li>
                <Link href="/environmental" className="text-white/70 hover:text-white">
                  Environmental Impact
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-white/70 hover:text-white">
                  Sustainable Solutions
                </Link>
              </li>
              <li>
                <Link href="/recycling" className="text-white/70 hover:text-white">
                  Recycling Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PlasticInfo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-white/70 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white/70 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white/70 hover:text-white">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
