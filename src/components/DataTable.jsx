function DataTable({ columns, data }) {

  return (
    <div className="table-wrapper">

      <table>

        <thead>

          <tr>

            {columns.map((column) => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row) => (

            <tr key={row.id}>

              {columns.map((column) => (

                <td key={column.key}>

                  {column.render
                    ? column.render(row)
                    : row[column.key]}

                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DataTable;