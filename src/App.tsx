import "./app.scss";
import { Header } from "./components/Header";
import { Table } from "./components/Table";

export function App() {
  return (
    <main className="main-container">
      <div className="container">
        <Header />
        <section className="section-container">
          <Table />
        </section>
      </div>
    </main>
  );
}
