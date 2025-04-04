<script>
  export let filter = "all"; // Bindable prop
</script>

<div class="filters btn-group stack-exception space-x-2">
  <button
    class="filter-btn"
    class:filter-active={filter === "all"}
    aria-pressed={filter === "all"}
    on:click={() => (filter = "all")}
  >
    <span>All Courses</span>
  </button>

  <button
    class="filter-btn"
    class:filter-active={filter === "seta"}
    aria-pressed={filter === "seta"}
    on:click={() => (filter = "seta")}
  >
    <span>Seta Courses</span>
  </button>

  <button
    class="filter-btn"
    class:filter-active={filter === "trades"}
    aria-pressed={filter === "trades"}
    on:click={() => (filter = "trades")}
  >
    <span>Trades Courses</span>
  </button>

  <button
    class="filter-btn"
    class:filter-active={filter === "international"}
    aria-pressed={filter === "international"}
    on:click={() => (filter = "international")}
  >
    <span>International Courses</span>
  </button>

  <button
    class="filter-btn"
    class:filter-active={filter === "educator training"}
    aria-pressed={filter === "educator training"}
    on:click={() => (filter = "educator training")}
  >
    <span>Educator Training</span>
  </button>

  <button
    class="filter-btn"
    class:filter-active={filter === "short-courses"}
    aria-pressed={filter === "short-courses"}
    on:click={() => (filter = "short-courses")}
  >
    <span>Short Courses</span>
  </button>
</div>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap; /* Allow buttons to wrap on small screens */
    justify-content: center;
    gap: 0.5rem; /* Reduced gap for better spacing */
    padding: 1rem 0;
  }

  .filter-btn {
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 2px solid transparent;
    border-radius: 9999px;
    background: #f3f4f6;
    color: #374151;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .filter-btn:hover {
    background: #e5e7eb;
    transform: scale(1.05);
  }

  .filter-active {
    background: red;
    color: #ffffff;
    box-shadow: 0px 6px 12px rgba(7, 40, 64, 0.5); /* Match bg color */
  }

  .filter-active:hover {
    transform: scale(1.1);
  }
</style>