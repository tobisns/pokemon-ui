import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetch_pokemon_data, fetch_types_data } from "../../services/fetch";
import { TreePokemonWidget, DropIndicator } from "../widgets/tree-pokemon-widget";

export const TreeNodeInputLoader = ({ title, headingColor, cards, forSubmit, column, setCards, setForSubmit }) => {
    const limit = 20;
    const [active, setActive] = useState(false);
	  const [hasMore, setHasMore] = useState(true);
	  const [index, setIndex] = useState(1);

    useEffect(() => {
      fetch_data();
    }, [])

    const fetch_data = async () => {
      try {
        const pokemonData = await fetch_pokemon_data(limit, 0)
        // Transform the array
        const transformedArray = pokemonData
        .filter((e) => e.evo_tree_id === -1)
        .map(e => ({
          title: e.name,
          column: 0,
          id: e.name
        }));
        setCards(transformedArray)
  
      } catch (err) {
        console.log(err)
      }
    }

    const fetchMoreData = async () => {
      try {
        const pokemonData = await fetch_pokemon_data(limit, index)
        // Transform the array
        const transformedArray = pokemonData
        .filter((e) => e.evo_tree_id === -1)
        .map(e => ({
          title: e.name,
          column: 0,
          id: e.name
        }));
        setCards((prevItems) => [...prevItems, ...transformedArray])
        setIndex((prevIndex) => prevIndex + 1)
        pokemonData.length > 0 ? setHasMore(true) : setHasMore(false)
      } catch (err) {
        console.log(err)
      }
    }
  
    const loadingScroll = () => {
      return (
        <>
          <h4 className="bg-black text-center text-white">Loading...</h4>
        </>
      )
    }

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
  
        let cardToTransfer = copy.find((c) => c.id === cardId);
        if (!cardToTransfer) {
          cardToTransfer = copySubmit.find((c) => c.id === cardId);
          cardToTransfer = { ...cardToTransfer, column };
  
          copySubmit = copySubmit.filter((c) => c.id !== cardId);
          setForSubmit(copySubmit);
        } else {
          cardToTransfer = { ...cardToTransfer, column };
  
          copy = copy.filter((c) => c.id !== cardId);
        }
  
        const moveToBack = before === "-1";
  
        if (moveToBack) {
          copy.push(cardToTransfer);
        } else {
          const insertAtIndex = copy.findIndex((el) => el.id === before);
          if (insertAtIndex === undefined) return;
  
          copy.splice(insertAtIndex, 0, cardToTransfer);
        }
  
        setCards(copy);
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
  
    const filteredCards = cards.filter((c) => c.column === column);
  
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
          <InfiniteScroll
						dataLength={filteredCards.length}
						next={fetchMoreData}
						hasMore={hasMore}
						loader={loadingScroll()}
					>
          {filteredCards.map((c) => {
            return <TreePokemonWidget key={c.id} {...c} handleDragStart={handleDragStart} />;
          })}
          </InfiniteScroll>
          <DropIndicator beforeId={null} column={column} />
        </div>
      </div>
    );
  };