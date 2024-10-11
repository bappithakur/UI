const DGCard = () => {
  return (
    <>
      <div class="card">
        <div class="card-body">
          <div class="row d-flex justify-content-center">
            <div class="col-9">
              <p class="text-dark mb-0 fw-semibold">Sessions</p>
              <h3 class="my-1 font-20 fw-bold">24k</h3>
              <p class="mb-0 text-truncate text-muted">
                <span class="text-success">
                  <i class="mdi mdi-trending-up"></i>8.5%
                </span>{" "}
                New Sessions Today
              </p>
            </div>
            <div class="col-3 align-self-center">
              <div class="d-flex justify-content-center align-items-center thumb-md bg-light-alt rounded-circle mx-auto">
                <i class="ti ti-users font-24 align-self-center text-muted"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DGCard;
