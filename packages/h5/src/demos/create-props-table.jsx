import React from 'react';

export function createPropsTable(propRecord) {
  return function PropsTable() {
    return (
      <div className='markdown'>
        <table>
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(propRecord).map(prop => {
              const item = propRecord[prop]
              return (
                <tr key={prop}>
                  <td>{prop}</td>
                  <td>{item.description}</td>
                  <td>{item.type && <code>{item.type}</code>}</td>
                  <td>{item.default ? <code>{item.default}</code> : '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
