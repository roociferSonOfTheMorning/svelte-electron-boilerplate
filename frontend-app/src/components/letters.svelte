<script>
  let promiseGet;
  let promisePost;
  let getLetters = function () {
    promiseGet = undefined;
    promiseGet = globalThis.electron.getLetters();
  };
  let loadLetters = function () {
    promisePost = undefined;
    promisePost = globalThis.electron.loadLetters();
  };
</script>

<button on:click={getLetters}>Get Letters</button>
<button on:click={loadLetters}>Load Letters</button>

{#await promiseGet}
  <p>...waiting</p>
{:then response}
  {#if response}
    <p>Letter Rows: {response.total_rows}</p>
    {#if response.total_rows > 0}
      <table>
        <thead>
          <tr>
            {#each Object.keys(response.rows[0]) as columnHeading}
              <th>{columnHeading}</th>
            {/each}
          </tr><tr />
        </thead>
        <tbody>
          {#each response.rows as row}
            <tr>
              {#each Object.values(row) as cell}
                <td>{cell}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

{#await promisePost}
  <p>...loading</p>
{:then response}
  {#if response}
    <table>
      <thead>
        <tr>
          {#each Object.keys(response[0]) as columnHeading}
            <th>{columnHeading}</th>
          {/each}
        </tr><tr />
      </thead>
      <tbody>
        {#each response as row}
          <tr>
            {#each Object.values(row) as cell}
              <td>{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
