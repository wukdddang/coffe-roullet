// import React from 'react';

// const page = () => {
//   return (
//     <div class="row">
//       <div class="col-sm-4"></div>
//       <div class="col-sm-4 mt-5">
//         <div class="row">
//           <div class="col-sm-12">
//             <table class="table table-hover">
//               <colgroup>
//                 <col style="width: 20%" />
//                 <col style="width: 80%" />
//               </colgroup>

//               <thead>
//                 <tr>
//                   <th>No</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <% user.histories.forEach((history, index) => { %>
//                 <tr>
//                   <th scope="row"><%= index + 1 %></th>
//                   <td>
//                     <% const options = { weekday: 'long', year: 'numeric',
//                     month: 'long', day: 'numeric' }; const formattedDate = new
//                     Intl.DateTimeFormat('ko-KR', options).format(new
//                     Date(history.createdAt)); %> <%= formattedDate %>
//                   </td>
//                 </tr>
//                 <% }) %>
//               </tbody>
//             </table>
//           </div>
//           <div class="col-12">
//             <form method="post" target="/user">
//               <div
//                 class="form-group d-flex align-items-end justify-content-end"
//               >
//                 <span class="mb-3 me-2"> winRate: <%= winRate %> %</span>
//                 <button
//                   type="button"
//                   class="btn btn-danger mb-3 me-2"
//                   onclick="location.href='/admin/user/delete/<%= user._id %>'"
//                 >
//                   삭제하기
//                 </button>
//                 <button
//                   type="button"
//                   onclick="window.location.href='/user';"
//                   class="btn btn-warning mb-3"
//                 >
//                   뒤로가기
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div class="col-sm-4"></div>
//     </div>
//   );
// };

// export default page;
