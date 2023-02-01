import MainHeader from "./main-header";

export default function Layout(props: { children: JSX.Element }) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}
