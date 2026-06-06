import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SetsIntro from "./modules/sets/SetsIntro.jsx";

function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-layout">
        <Sidebar />

        <section className="content-area">
          <SetsIntro />
        </section>

        <aside className="right-panel">
          <div className="side-card">
            <span className="card-icon">🌍</span>
            <h3>Onde uso isso?</h3>
            <p>
              Conjuntos aparecem quando organizamos coisas em grupos: alunos,
              livros, produtos, números, contatos, tarefas e muito mais.
            </p>
          </div>

          <div className="side-card">
            <span className="card-icon">🎯</span>
            <h3>Missão</h3>
            <p>
              Entender que um conjunto é uma coleção de elementos com algo em
              comum.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
