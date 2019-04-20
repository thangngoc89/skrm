open ReactHelpers;
open RecordManage__Types;

module ManageTabulator = RecordManage__Tabulator;
module T = Grommet__Tab;

[@react.component]
let make = () => {
  let (tab, setTab) = React.useState(() => Tieuhoc);
  let setTabByIndex = tabIndex =>
    switch (tabFromJs(tabIndex)) {
    | Some(tab) => setTab(_ => tab)
    | None => ()
    };

  <Box className="m-4">
    <Box className="my-6">
      <Heading level=1 align="left"> {j|Quản lí hồ sơ|j}->str </Heading>
      <Text size="large" color="dark-1">
        {j|Liệt kê, sửa và tạo hồ sơ|j}->str
      </Text>
    </Box>
    <React.Suspense fallback={<Spinner />}>
      <T.Tabs
        activeIndex={tab->tabToJs} onActive=setTabByIndex justify="start">
        <T.Tab title={j|Tiểu học|j}>
          <ManageTabulator tab=Tieuhoc />
        </T.Tab>
        <T.Tab title={j|Mẫu giáo|j}>
          <ManageTabulator tab=Maugiao />
        </T.Tab>
      </T.Tabs>
    </React.Suspense>
  </Box>;
};

let default = make;
