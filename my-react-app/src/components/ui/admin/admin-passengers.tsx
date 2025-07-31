
import {
  Card,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"


export function AdminPassengers() {
  const navigate = useNavigate()
  const HandleClick = () => {
    navigate('/login')
  }
  return (
    <>
      <main className='flex-1 container mx-auto px-4 py-8'>
      <div className="flex justify-between">
        <h2 className='text-2xl font-bold mb-5'>Passengers</h2>
        
          <button className="inline-flex justify-end gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search h-4 w-4 mr-2" ><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            View Passenger Details</button>
        </div>
        <Card>
          <h2 className="text-2xl font-bold mt-2 mb-2">Passenger Manegement</h2>
          <div className="class="flex-col md:flex-row gap-4 mb-6>
            <div className="relative flex-1"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" >
              <circle cx="11" cy="11" r="8">
              </circle>
            <path d="m21 21-4.3-4.3"></path></svg>
            <div className="flex gap-2.5 mt-1">
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search passengers">
            </input>
           
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Filter
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Export
              </button>

            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-b-gray-500">
                <thead>
                  <tr className="border-b">
                  <th className="text-left p-2" >Booking ID</th>
                  <th className="text-left p-2">Passenger Name</th>
                  <th className="text-left p-2" >Flight</th>
                  <th className="text-left p-2">From - To</th>
                  <th className="text-left p-2" >Travel Date</th>
                  <th className="text-left p-2">Booking Status</th>
                  <th className="text-left p-2" >Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b" >
                    <td className="p-2">B10001</td>
                    <td className="p-2">Emma Johnson</td>
                    <td className="p-2" >XY101</td>
                    <td className="p-2">London - Paris</td>
                    <td className="p-2" >May 11, 2025</td>
                    <td className="p-2" >
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800" >Confirmed</span>
                      </td>
                      <td className="p-2" >
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50   [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                          View Details</button>
                          </td></tr>
                          <tr className="border-b">
                            <td className="p-2" >B10002</td>
                            <td className="p-2" >Michael Brown</td>
                            <td className="p-2" >XY102</td>
                            <td className  ="p-2" >Tokyo - Sydney</td>
                            <td className="p-2" >May 12, 2025</td>
                            <td className="p-2" ><span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">Confirmed</span>
                            </td>
                            <td className="p-2"><button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">View Details</button>
                            </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">B10003</td>
                              <td className="p-2" >John Smith</td>
                              <td className="p-2" >XY103</td>
                              <td className="p-2">New York - London</td>
                              <td className="p-2" >May 13, 2025</td>
                              <td className="p-2" >
                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800" >Confirmed</span></td>
                                <td className="p-2">
                                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                    View Details
                                  </button></td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="p-2" >B10004</td>
                                    <td className="p-2" >Emma Johnson</td>
                                    <td className="p-2" >XY104</td>
                                    <td className="p-2" >London - Paris</td>
                                    <td className="p-2" >May 14, 2025</td>
                                    <td className="p-2" >
                                      <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800" >
                                        Pending</span></td>
                                        <td className="p-2" >
                                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                            View Details</button></td></tr>
                                            <tr className="border-b" >
                                              <td className="p-2">B10005</td>
                                              <td className="p-2" >Michael Brown</td>
                                              <td className="p-2">XY105</td>
                                              <td className="p-2" >Tokyo - Sydney</td>
                                              <td className ="p-2">May 15, 2025</td>
                                              <td className="p-2" >
                                                <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800" >Cancelled</span></td>
                                                <td className="p-2">
                                                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                                    View Details</button></td></tr>
                                                    <tr className="border-b">
                                                    <td className="p-2" >B10006</td>
                                                    <td className="p-2">John Smith</td>
                                                    <td className="p-2">XY106</td>
                                                    <td className="p-2">New York - London</td>
                                                    <td className="p-2" >May 16, 2025</td>
                                                    <td className="p-2">
                                                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">Confirmed</span></td>
                                                      <td className="p-2" >
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                                      View Details</button></td></tr>
                                                      <tr className="border-b" ><td className="p-2">B10007</td>
                                                      <td className="p-2" >Emma Johnson</td>
                                                      <td className="p-2" >XY107</td>
                                                      <td className="p-2" >London - Paris</td>
                                                      <td className="p-2">May 17, 2025</td>
                                                      <td className="p-2" >
                                                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800" >Confirmed</span></td>
                                                        <td className="p-2" >
                                                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">View Details
                                                            </button></td></tr>

                                                            <tr className="border-b" ><td className="p-2">B10008</td>
                                                      <td className="p-2" >Michel Jackson</td>
                                                      <td className="p-2" >XY108</td>
                                                      <td className="p-2" > Tokyo-Sydney</td>
                                                      <td className="p-2">May 17, 2025</td>
                                                      <td className="p-2" >
                                                        <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-amber-800" >Pending</span></td>
                                                        <td className="p-2" >
                                                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">View Details
                                                            </button></td></tr>

                                                            <tr className="border-b" ><td className="p-2">B10009</td>
                                                      <td className="p-2" >Jophn Smith</td>
                                                      <td className="p-2" >XY109</td>
                                                      <td className="p-2" >New York-London</td>
                                                      <td className="p-2">May 19, 2025</td>
                                                      <td className="p-2" >
                                                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800" >Confirmed</span></td>
                                                        <td className="p-2" >
                                                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">View Details
                                                            </button></td></tr>

                                                            <tr className="border-b" ><td className="p-2">B10010</td>
                                                      <td className="p-2" >Emma Johnson</td>
                                                      <td className="p-2" >XY110</td>
                                                      <td className="p-2" >London - Paris</td>
                                                      <td className="p-2">May 25, 2025</td>
                                                      <td className="p-2" >
                                                        <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800" >Canceled</span></td>
                                                        <td className="p-2" >
                                                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">View Details
                                                            </button>
                                                            </td>
                                                            </tr>
                                                          
                                                              </tbody>
                                                </table>
              <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500" >Showing 1-10 of 156 passengers

              </div>
              
              </div>
              <div className="flex gap-2">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3" disabled>
                Previous</button>

                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  Next</button>
              </div>


            </div>
            </div>
          </div>

          </Card>
      </main>
      
    </>
  )
}