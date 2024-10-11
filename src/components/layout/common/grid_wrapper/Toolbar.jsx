import { Pagination } from "antd";
const Toolbar = (props) => {
  const { children } = props;
  return (
    <>
      <div className="row toolbar-area">
        <div className="col-4">{children}</div>
        <div className="col-8">
          <Pagination
            className="float-end"
            showSizeChanger={true}
            current={1}
            defaultCurrent={1}
            defaultPageSize={1}
            showLessItems={true}
            showQuickJumper={false}
            showTitle={true}
            simple={false}
            total={2}
          />
        </div>
      </div>
    </>
  );
};
export default Toolbar;
