'use client'

import FooterAbout from "./FooterAbout"
import FooterBottom from "./FooterBottom"
import FooterContact from "./FooterContact"
import FooterHelp from "./FooterHelp"



export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container-custom py-12">
        {/* মূল ফুটার গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterAbout />
          <FooterHelp />
          <FooterContact />
          <div className="lg:col-span-1">
            {/* কোম্পানির বিবরণ */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Packly</h3>
              <p className="text-sm text-gray-600">
                Our products are arranged directly from brands or authorized distributors. 
                They're stored and shipped directly from our climate-controlled, GMP-certified warehouse.
              </p>
            </div>
          </div>
        </div>

        {/* নিচের অংশ */}
        <FooterBottom />
      </div>
    </footer>
  )
}