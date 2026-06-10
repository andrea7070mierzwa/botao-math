import { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SetsIntro from "./modules/sets/SetsIntro.jsx";
import BelongsActivity from "./modules/sets/BelongsActivity.jsx";
import EmptyUnitaryActivity from "./modules/sets/EmptyUnitaryActivity.jsx";
import UnionActivity from "./modules/sets/UnionActivity.jsx";
import IntersectionActivity from "./modules/sets/IntersectionActivity.jsx";
import DifferenceActivity from "./modules/sets/DifferenceActivity.jsx";
import SubsetsActivity from "./modules/sets/SubsetsActivity.jsx";
import NumericSetsActivity from "./modules/sets/NumericSetsActivity.jsx";
import SetsSummary from "./modules/sets/SetsSummary.jsx";
import SetsAssessment from "./modules/sets/SetsAssessment.jsx";
import NumbersIntro from "./modules/numbers/NumbersIntro.jsx";
import NaturalNumbers from "./modules/numbers/NaturalNumbers.jsx";
import IntegerNumbers from "./modules/numbers/IntegerNumbers.jsx";
import RationalNumbers from "./modules/numbers/RationalNumbers.jsx";
import RealNumbers from "./modules/numbers/RealNumbers.jsx";
import NumberLineActivity from "./modules/numbers/NumberLineActivity.jsx";
import NumberComparison from "./modules/numbers/NumberComparison.jsx";
import TemperatureIntegers from "./modules/numbers/TemperatureIntegers.jsx";

function App() {
  const [activeModule, setActiveModule] = useState("sets-intro");

  return (
    <div className="app-shell">
      <Header />

      <main className="app-layout">
        <Sidebar activeModule={activeModule} onChangeModule={setActiveModule} />

        <section className="content-area">
          {activeModule === "sets-intro" && <SetsIntro />}
          {activeModule === "belongs" && <BelongsActivity />}
          {activeModule === "empty-unitary" && <EmptyUnitaryActivity />}
          {activeModule === "union" && <UnionActivity />}
          {activeModule === "intersection" && <IntersectionActivity />}
          {activeModule === "difference" && <DifferenceActivity />}
          {activeModule === "subsets" && <SubsetsActivity />}
          {activeModule === "numeric-sets" && <NumericSetsActivity />}
          {activeModule === "sets-summary" && <SetsSummary />}
          {activeModule === "sets-assessment" && <SetsAssessment />}
          {activeModule === "numbers-intro" && <NumbersIntro />}
          {activeModule === "natural-numbers" && <NaturalNumbers />}
          {activeModule === "integer-numbers" && <IntegerNumbers />}
          {activeModule === "rational-numbers" && <RationalNumbers />}
          {activeModule === "real-numbers" && <RealNumbers />}
          {activeModule === "number-line" && <NumberLineActivity />}
          {activeModule === "number-comparison" && <NumberComparison />}
          {activeModule === "temperature-integers" && <TemperatureIntegers />}
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
              Entender se um elemento faz parte ou não de um conjunto, sem
              precisar invocar o fantasma da matemática.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
