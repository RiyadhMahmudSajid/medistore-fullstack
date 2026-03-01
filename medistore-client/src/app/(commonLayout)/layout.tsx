import Navbar from "@/components/layout/navbar"



const layout = ({ children }: { children: React.ReactNode }) => {
   return (
     <div>
        <Navbar></Navbar>
       <main className="mt-16">
        {children}
      </main>
   
    
    </div>
   )
}

export default layout