"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MaterialCard } from "@/components/dashboard/material-card";
import { Icon } from "@/components/quiz-editor/icon";
import type { MaterialWithAuthor } from "@/types";

const ALL = "All";

type Props = {
  materials: MaterialWithAuthor[];
  categories: string[];
};

export function BrowseSection({ materials, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") ?? ALL
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildUrl = useCallback(
    (newSearch: string, newCategory: string) => {
      const params = new URLSearchParams();
      if (newSearch.trim()) params.set("search", newSearch.trim());
      if (newCategory !== ALL) params.set("category", newCategory);
      const qs = params.toString();
      return `${pathname}${qs ? `?${qs}` : ""}`;
    },
    [pathname]
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      router.replace(buildUrl(value, activeCategory), { scroll: false });
    }, 300);
  }

  function handleCategoryClick(category: string) {
    setActiveCategory(category);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    router.replace(buildUrl(search, category), { scroll: false });
  }

  function clearFilters() {
    setSearch("");
    setActiveCategory(ALL);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    router.replace(pathname, { scroll: false });
  }

  // Sync state if browser navigates (back/forward)
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setActiveCategory(searchParams.get("category") ?? ALL);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return materials.filter((m) => {
      const matchesSearch = !q || m.title.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === ALL || m.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [materials, search, activeCategory]);

  // Increment key on every filter change so the grid remounts and the CSS
  // animation replays without interrupting existing cards visually.
  const [gridKey, setGridKey] = useState(0);
  const prevFiltered = useRef(filtered);
  useEffect(() => {
    if (prevFiltered.current !== filtered) {
      setGridKey((k) => k + 1);
      prevFiltered.current = filtered;
    }
  }, [filtered]);

  const isFiltering = search.trim() !== "" || activeCategory !== ALL;

  return (
    <div>
      {/* Search + category filter */}
      <div className="mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none flex items-center">
            <Icon name="search" size={18} />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by title…"
            aria-label="Search materials"
            className="w-full sm:max-w-sm rounded border border-transparent bg-surface pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors hover:border-border focus:border-border"
          />
        </div>

        {/* Category pills */}
        {categories.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {[ALL, ...categories].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-surface text-foreground/70 hover:bg-border hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <NoResultsState onClear={clearFilters} isFiltering={isFiltering} />
      ) : (
        <div
          key={gridKey}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-grid-fade-in"
        >
          {filtered.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </div>
  );
}

function NoResultsState({
  onClear,
  isFiltering,
}: {
  onClear: () => void;
  isFiltering: boolean;
}) {
  return (
    <div className="border border-dashed border-border rounded-lg py-20 px-6 flex flex-col items-center text-center animate-grid-fade-in">
      <h2 className="text-[20px] font-semibold leading-[1.3] text-foreground">
        No results found.
      </h2>
      <p className="mt-1 text-sm text-foreground/60 max-w-xs">
        Nothing matched your search. Try different keywords or browse all
        categories.
      </p>
      {isFiltering && (
        <button
          type="button"
          onClick={onClear}
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded border border-border text-sm font-medium text-foreground hover:bg-surface transition-colors"
        >
          <Icon name="filter_alt_off" size={16} />
          Clear filters
        </button>
      )}
    </div>
  );
}
