import { useState } from "react";
import { DropIndicator, TreePokemonWidget } from "../widgets/tree-pokemon-widget";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetch_pokemon_data } from "../../services/fetch";


export const TreeNodeInput = ({ title, headingColor, cards, forSubmit, column, setCards, setForSubmit}) => {
    const [active, setActive] = useState(false);
  
    const handleDragStart = (e, card) => {
      e.dataTransfer.setData("cardId", card.id);
    };
  
    const handleDragEnd = (e) => {
      const cardId = e.dataTransfer.getData("cardId");
  
      setActive(false);
      clearHighlights(getIndicators());
  
      const indicators = getIndicators();
      const { element } = getNearestIndicator(e, indicators);
  
      const before = element.dataset.before || "-1";
  
      if (before !== cardId) {
        let copy = [...cards];
        let copySubmit = [...forSubmit];
  
        let cardToTransfer = copySubmit.find((c) => c.id === cardId);
        if (!cardToTransfer) {
          cardToTransfer = copy.find((c) => c.id === cardId);
          cardToTransfer = { ...cardToTransfer, column };
  
          copy = copy.filter((c) => c.id !== cardId);
          setCards(copy);
        } else {
          cardToTransfer = { ...cardToTransfer, column };
  
          copySubmit = copySubmit.filter((c) => c.id !== cardId);
        }
  
        const moveToBack = before === "-1";
  
        if (moveToBack) {
          copySubmit.push(cardToTransfer);
        } else {
          const insertAtIndex = copySubmit.findIndex((el) => el.id === before);
          if (insertAtIndex === undefined) return;
  
          copySubmit.splice(insertAtIndex, 0, cardToTransfer);
        }

        console.log(copySubmit);
  
        setForSubmit(copySubmit);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      highlightIndicator(e);
  
      setActive(true);
    };
  
    const clearHighlights = (els) => {
      const indicators = els || getIndicators();
  
      indicators.forEach((i) => {
        i.style.opacity = "0";
      });
    };
  
    const highlightIndicator = (e) => {
      const indicators = getIndicators();
  
      clearHighlights(indicators);
  
      const el = getNearestIndicator(e, indicators);
  
      el.element.style.opacity = "1";
    };
  
    const getNearestIndicator = (e, indicators) => {
      const DISTANCE_OFFSET = 50;
  
      const el = indicators.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
  
          const offset = e.clientY - (box.top + DISTANCE_OFFSET);
  
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
          element: indicators[indicators.length - 1],
        }
      );
  
      return el;
    };
  
    const getIndicators = () => {
      return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };
  
    const handleDragLeave = () => {
      clearHighlights(getIndicators());
      setActive(false);
    };
  
    const filteredCards = forSubmit.filter((c) => c.column === column);
  
    return (
      <div className="w-56 shrink-0">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
          <span className="rounded text-sm text-neutral-400">
            {filteredCards.length}
          </span>
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors ${
            active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
        >
          {filteredCards.map((c) => {
            return <TreePokemonWidget key={c.id} {...c} handleDragStart={handleDragStart} />;
          })}
          <DropIndicator beforeId={null} column={column} />
          {/* <AddTreePokemonWidget column={column} setCards={setCards} /> */}
        </div>
      </div>
    );
  };

const AddTreePokemonWidget = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};