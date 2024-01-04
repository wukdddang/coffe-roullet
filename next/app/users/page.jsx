// import UserList from "@/components/user-list/UserList";

export default function Page() {
  return (
    <div className="row">
      <div className="col-sm-4"></div>
      <div className="col-sm-4 mt-5">
        <div className="row">
          <div className="col-sm-12 mx-2">
            <table className="table table-hover">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th>Rank</th>
                  <th>이름</th>
                  <th>걸린 횟수</th>
                  <th className="text-center">가중치</th>
                  <th>
                    상세
                    <br />
                    보기
                  </th>
                </tr>
              </thead>
              <tbody>{/* <UserList users={users} /> */}</tbody>
            </table>
          </div>
          <div className="col-sm-12">
            <form method="post" target="/user">
              <div className="form-group d-flex align-items-end justify-content-end">
                <div className="mb-3 col-sm-5">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="input_user_name"
                    aria-describedby="emailHelp"
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-3 mx-2">
                  추가
                </button>
                <button
                  type="button"
                  onClick="window.location.href='/';"
                  className="btn btn-warning mb-3"
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
}
