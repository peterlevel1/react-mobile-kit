import '@testing-library/jest-dom/extend-expect';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { toHaveNoViolations, axe } from 'jest-axe';
import * as React from 'react';
import { RunOptions } from 'axe-core';

expect.extend(toHaveNoViolations);

const AllTheProviders = ({ children }) => {
  /**
   * TODO: 在这里添加 Provider 如
   * import { ThemeProvider } from 'my-ui-lib'
   * import { TranslationProvider } from 'my-i18n-lib'
   * import defaultStrings from 'i18n/en-x-default'
   *
   *  return (
   *     <ThemeProvider theme="light">
   *       <TranslationProvider messages={defaultStrings}>
   *         {children}
   *       </TranslationProvider>
   *     </ThemeProvider>
   *   )
   */
  return children
}

/**
 * Custom render for @testing-library/react
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @param component the component under test
 * @param options customized test options
 */
export const customRender = (
  ui,
  { wrapper: Wrapper = AllTheProviders, ...options }
) => render(<Wrapper>{ui}</Wrapper>, options);

// re-export everything
export * from '@testing-library/react';

export {
  act,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks';

export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender }

/**
 * Validates against common a11y mistakes.
 *
 * Wrapper for jest-axe
 *
 * @example
 * ```jsx
 * it('passes a11y test', async () => {
 *  await testA11Y(<MyComponent />, options);
 * });
 *
 * // sometimes we need to perform interactions first to render conditional UI
 * it('passes a11y test when open', async () => {
 *  const { container } = render(<MyComponent />, options);
 *
 *  fireEvent.click(screen.getByRole('button'));
 *
 *  await testA11Y(container, options);
 * });
 * ```
 *
 * @see https://github.com/nickcolley/jest-axe#testing-react-with-react-testing-library
 */
export const testA11y = async (
  ui,
  { axeOptions, ...options }
) => {
  const container = React.isValidElement(ui)
    ? customRender(ui, options).container
    : ui;

  const results = await axe(container, axeOptions);

  expect(results).toHaveNoViolations();
}
