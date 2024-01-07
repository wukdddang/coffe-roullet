"use client";

import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="row">
      <div className="col-sm-4"></div>
      <div className="col-sm-4 mt-5">
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-hover">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "80%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th>No</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* <% user.histories.forEach((history, index) => { %>
            <tr>
              <th scope="row"><%= index + 1 %></th>
              <td>
                <% const options = { weekday: 'long', year: 'numeric',
                month: 'long', day: 'numeric' }; const formattedDate = new
                Intl.DateTimeFormat('ko-KR', options).format(new
                Date(history.createdAt)); %> <%= formattedDate %>
              </td>
            </tr>
            <% }) %> */}
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <form method="post" target="/user">
              <div className="form-group d-flex align-items-end justify-content-end">
                <span className="mb-3 me-2"> winRate: %</span>
                <button
                  type="button"
                  className="btn btn-danger mb-3 me-2"
                  // onclick="location.href='/admin/user/delete/<%= user._id %>'"
                >
                  삭제하기
                </button>
                <button
                  type="button"
                  // onclick="window.location.href='/user';"
                  className="btn btn-warning mb-3"
                  onClick={() => {
                    router.back();
                  }}
                >
                  뒤로가기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
};

export default page;
