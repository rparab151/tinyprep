import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Baby, CalendarDays, Check, Clock, Heart, ListChecks, RefreshCcw, Search, ShoppingBasket, Snowflake, Sparkles, Utensils } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

const MEALS = [
  {
    id: 1,
    name: "Banana Oat Pancake Bites",
    slot: "Breakfast",
    batch: "18 mini bites",
    time: 18,
    stores: "Freeze 1 month",
    reheat: "Microwave 20–30 sec",
    status: "Accepted",
    tags: ["freezer", "soft", "vegetarian"],
    ingredients: ["banana", "rolled oats", "egg", "cinnamon", "berries"],
    tip: "Freeze flat, then move to a bag. Pack with yogurt or berries."
  },
  {
    id: 2,
    name: "Dal Rice Toddler Cups",
    slot: "Dinner",
    batch: "5 small cups",
    time: 32,
    stores: "Fridge 3 days / freeze 1 month",
    reheat: "Add water, microwave covered, stir well",
    status: "Accepted",
    tags: ["freezer", "soft", "budget"],
    ingredients: ["moong dal", "rice", "ghee", "carrot", "cumin"],
    tip: "Keep texture loose. Toddlers often reject thick, sticky dal rice."
  },
  {
    id: 3,
    name: "Mini Veggie Quesadilla Strips",
    slot: "Lunchbox",
    batch: "6 wedges",
    time: 15,
    stores: "Fridge 2 days",
    reheat: "Toast 2–3 min or serve room temp",
    status: "Accepted",
    tags: ["lunchbox", "quick", "vegetarian"],
    ingredients: ["tortillas", "shredded cheese", "bell pepper", "corn", "avocado"],
    tip: "Cut into thin strips and serve avocado separately."
  },
  {
    id: 4,
    name: "Soft Egg & Veggie Muffins",
    slot: "Breakfast",
    batch: "12 mini muffins",
    time: 24,
    stores: "Fridge 3 days / freeze 1 month",
    reheat: "Microwave 15–20 sec",
    status: "Trying",
    tags: ["freezer", "protein", "nut-free"],
    ingredients: ["eggs", "spinach", "cheese", "milk", "muffin liners"],
    tip: "Call them egg cupcakes and start with half a muffin."
  },
  {
    id: 5,
    name: "Turkey Meatball Stars",
    slot: "Dinner",
    batch: "20 mini meatballs",
    time: 28,
    stores: "Freeze 2 months",
    reheat: "Simmer in sauce or microwave covered",
    status: "Trying",
    tags: ["freezer", "protein", "family"],
    ingredients: ["ground turkey", "breadcrumbs", "egg", "marinara", "pasta stars"],
    tip: "Serve sauce on the side first if mixed textures cause rejection."
  },
  {
    id: 6,
    name: "Apple Yogurt Snack Cups",
    slot: "Snack",
    batch: "3 snack cups",
    time: 8,
    stores: "Fridge 2 days",
    reheat: "Serve cold",
    status: "Accepted",
    tags: ["no-cook", "quick", "snack"],
    ingredients: ["Greek yogurt", "apple", "cinnamon", "granola", "sunflower butter"],
    tip: "For toddlers, grate apple or soften it briefly."
  },
  {
    id: 7,
    name: "Salmon Sweet Potato Patties",
    slot: "Dinner",
    batch: "10 small patties",
    time: 25,
    stores: "Freeze 1 month",
    reheat: "Air fryer or pan 4–5 min",
    status: "Retry later",
    tags: ["freezer", "omega-3", "protein"],
    ingredients: ["salmon", "sweet potato", "egg", "peas", "lemon"],
    tip: "Offer a tiny piece beside a familiar food, not as the main meal."
  }
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Meal = (typeof MEALS)[number];
type Tab = "prep" | "week" | "meals" | "groceries";

function rotate<T>(array: T[], seed: number): T[] {
  const copy = [...array];
  for (let i = 0; i < seed % copy.length; i++) {
    const item = copy.shift();
    if (item) copy.push(item);
  }
  return copy;
}

export default function App() {
  const [tab, setTab] = useState<Tab>("prep");
  const [prepDay, setPrepDay] = useState("Sunday");
  const [seed, setSeed] = useState(1);
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<number[]>([1, 2, 3]);

  const plan = useMemo(() => {
    const rotated = rotate(MEALS, seed);
    return DAYS.map((day, i) => ({
      day,
      breakfast: rotated[i % rotated.length],
      lunchbox: rotated[(i + 2) % rotated.length],
      dinner: rotated[(i + 4) % rotated.length]
    }));
  }, [seed]);

  const groceries = useMemo(() => {
    const map = new Map<string, number>();
    plan.forEach((day) => [day.breakfast, day.lunchbox, day.dinner].forEach((meal) => meal.ingredients.forEach((x) => map.set(x, (map.get(x) || 0) + 1))));
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [plan]);

  const filteredMeals = MEALS.filter((m) => `${m.name} ${m.slot} ${m.tags.join(" ")} ${m.ingredients.join(" ")}`.toLowerCase().includes(query.toLowerCase()));

  function toggleFavorite(id: number) {
    setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand" onClick={() => setTab("prep")}>
            <div className="brand-icon"><Baby size={20} /></div>
            <div className="brand-copy">
              <div className="brand-title">TinyPrep</div>
              <div className="brand-subtitle">Free toddler meal prep</div>
            </div>
          </button>
          <nav className="nav-tabs">
            {[
              ["prep", "Prep"],
              ["week", "Week"],
              ["meals", "Meals"],
              ["groceries", "Groceries"]
            ].map(([key, label]) => (
              <Button key={key} variant={tab === key ? "default" : "ghost"} className="pill" onClick={() => setTab(key as Tab)}>{label}</Button>
            ))}
          </nav>
          <Button className="pill" onClick={() => setSeed((x) => x + 1)}><RefreshCcw className="button-icon" size={16} /> New plan</Button>
        </div>
      </header>

      {tab === "prep" && (
        <main className="container hero-grid">
          <section>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <div className="eyebrow"><Sparkles size={16} /> Built for busy toddler parents</div>
              <h1>Prep once. Feed calmly all week.</h1>
              <p className="lead">A free kid meal-prep app concept for breakfast, daycare lunchbox, dinner, snacks, freezer inventory, reheating notes, and picky-eater rotation.</p>
              <div className="cta-row">
                <Button size="lg" className="pill wide" onClick={() => setTab("week")}>View weekly plan</Button>
                <Button size="lg" variant="outline" className="pill wide" onClick={() => setTab("groceries")}>Open grocery list</Button>
              </div>
            </motion.div>

            <div className="feature-grid">
              {[
                [Snowflake, "Freezer batches"],
                [ShoppingBasket, "Auto groceries"],
                [Heart, "Picky-eater tracking"]
              ].map(([Icon, text]) => (
                <Card key={text as string}><CardContent className="feature-card"><Icon size={20} /> <b>{text as string}</b></CardContent></Card>
              ))}
            </div>
          </section>

          <section>
            <Card className="large-card">
              <CardContent>
                <div className="section-header">
                  <div>
                    <div className="section-kicker">Prep day</div>
                    <h2>{prepDay} batch plan</h2>
                  </div>
                  <select value={prepDay} onChange={(e) => setPrepDay(e.target.value)}>
                    {['Saturday', 'Sunday', 'Monday'].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="stack">
                  {MEALS.filter((m) => m.tags.includes("freezer") || m.tags.includes("lunchbox")).slice(0, 5).map((meal) => (
                    <div key={meal.id} className="meal-strip">
                      <div className="strip-top">
                        <div>
                          <div className="meal-name">{meal.name}</div>
                          <div className="muted">{meal.batch} • {meal.time} min</div>
                        </div>
                        <span className="status-chip">{meal.status}</span>
                      </div>
                      <div className="info-grid">
                        <div><b>Store:</b> {meal.stores}</div>
                        <div><b>Reheat:</b> {meal.reheat}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      )}

      {tab === "week" && (
        <main className="container">
          <div className="page-header">
            <div>
              <div className="eyebrow"><CalendarDays size={16} /> 7-day toddler plan</div>
              <h2>Breakfast, lunchbox, dinner</h2>
              <p className="muted">Designed to repeat accepted foods while gently rotating new foods.</p>
            </div>
            <Button className="pill" onClick={() => setSeed((x) => x + 1)}><RefreshCcw className="button-icon" size={16} /> Shuffle</Button>
          </div>
          <div className="week-grid">
            {plan.map((day) => (
              <Card key={day.day}>
                <CardContent>
                  <div className="day-title">{day.day}</div>
                  {[["Breakfast", day.breakfast], ["Lunchbox", day.lunchbox], ["Dinner", day.dinner]].map(([slot, meal]) => {
                    const typedMeal = meal as Meal;
                    return (
                      <div key={slot as string} className="day-meal">
                        <div className="slot-label">{slot as string}</div>
                        <div className="day-meal-name">{typedMeal.name}</div>
                        <div className="tiny-row"><Clock size={12} /> {typedMeal.time} min</div>
                        <div className="tiny-text">{typedMeal.stores}</div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {tab === "meals" && (
        <main className="container">
          <div className="page-header">
            <div>
              <div className="eyebrow"><Utensils size={16} /> Meal library</div>
              <h2>Toddler-safe prep ideas</h2>
            </div>
            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search meal, tag, ingredient" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="meal-grid">
            {filteredMeals.map((meal) => (
              <Card key={meal.id} className="recipe-card">
                <CardContent>
                  <div className="recipe-top">
                    <div>
                      <div className="section-kicker">{meal.slot}</div>
                      <h3>{meal.name}</h3>
                    </div>
                    <button onClick={() => toggleFavorite(meal.id)} className={`favorite ${favorites.includes(meal.id) ? "active" : ""}`}><Heart size={18} fill={favorites.includes(meal.id) ? "currentColor" : "none"} /></button>
                  </div>
                  <div className="muted inline-meta"><Clock size={16} /> {meal.time} min <span>•</span> {meal.batch}</div>
                  <div className="info-stack">
                    <div><b>Store:</b> {meal.stores}</div>
                    <div><b>Reheat:</b> {meal.reheat}</div>
                    <div className="tip"><b>Tip:</b> {meal.tip}</div>
                  </div>
                  <div className="tags">{meal.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {tab === "groceries" && (
        <main className="container narrow">
          <Card className="large-card">
            <CardContent>
              <div className="page-header single">
                <div>
                  <div className="eyebrow"><ListChecks size={16} /> Grocery list</div>
                  <h2>Shop once for toddler prep</h2>
                  <p className="muted">Deduplicated from the weekly plan. Tap items as you shop.</p>
                </div>
              </div>
              <div className="grocery-grid">
                {groceries.map(([item, count]) => (
                  <button key={item} onClick={() => setChecked({ ...checked, [item]: !checked[item] })} className={`grocery-item ${checked[item] ? "checked" : ""}`}>
                    <span>{item}</span>
                    <span className="count-badge">{checked[item] ? <Check size={15} /> : count}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      )}
    </div>
  );
}
