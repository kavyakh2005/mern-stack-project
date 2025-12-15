import CategoryFilter from "@/components/website/categoryFilter";
import BrandFilter from "@/components/website/BrandFilter";
import ColorFilter from "@/components/website/ColorFilter";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#EEEFF6]"
      >
        <div className='max-w-[1360px] bg-white shadow p-7 rounded-[10px] mt-1.5 mx-auto mb-3' >
          Home / Shop / Top Cell Phones & Tablets
        </div>

        <div className='max-w-[1360px] bg-white mx-auto p-4 text-[18px] font-bold uppercase mb-3 rounded-[10px]'>
          <h1 className='ml-4 p-3'>top cell phones & tablets</h1>

          <div className='flex gap-2 ml-4'>
            <img src="3.png" alt="" className='cursor-pointer' />
            <img src="2.png" alt="" className='cursor-pointer' />
          </div>
        </div>

        <div className='max-w-[1360px] mx-auto mb-3'>
          <img src="1.png" alt="" />
        </div>
        <div className='max-w-[1360px] p-5 mx-auto rounded-[10px] bg-white grid grid-cols-7  gap-5'>

          <div className="col-span-2 space-y-6 ">
            <CategoryFilter/>
            <BrandFilter/>
            <ColorFilter/>
          </div>
          <div className="col-span-5">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}
