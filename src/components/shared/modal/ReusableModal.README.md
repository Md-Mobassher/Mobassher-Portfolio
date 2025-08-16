# ReusableModal Component

A highly customizable, accessible modal component built with Radix UI and Tailwind CSS.

## Features

- ✅ **Dynamic sizing** with 8 predefined sizes + custom width support
- ✅ **Responsive design** that works on all screen sizes
- ✅ **Accessibility** built-in with ARIA attributes and keyboard navigation
- ✅ **Flexible content** - supports any React components as children
- ✅ **Customizable behavior** - control close actions, positioning, and scrolling
- ✅ **Loading states** with disabled buttons during processing
- ✅ **TypeScript support** with full type safety

## Size Options

| Size     | Max Width   | Use Case                                  |
| -------- | ----------- | ----------------------------------------- |
| `xs`     | 320px       | Simple confirmations, alerts              |
| `sm`     | 480px       | Small forms, quick actions                |
| `md`     | 640px       | Standard forms, content display (default) |
| `lg`     | 768px       | Larger forms, detailed content            |
| `xl`     | 1024px      | Complex forms, multi-column layouts       |
| `2xl`    | 1280px      | Dashboards, data tables                   |
| `3xl`    | 1536px      | Large dashboards, complex interfaces      |
| `full`   | 95vw × 95vh | Full-screen modals, complex workflows     |
| `custom` | Custom      | Any specific width you need               |

## Basic Usage

```tsx
import { ReusableModal } from "@/components/shared/ReusableModal";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <ReusableModal
        open={isOpen}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          // Handle confirmation
          setIsOpen(false);
        }}
      />
    </>
  );
};
```

## Advanced Usage

### Custom Size Modal

```tsx
<ReusableModal
  open={isOpen}
  size="custom"
  customWidth="800px"
  title="Custom Width Modal"
  onClose={() => setIsOpen(false)}
  onConfirm={() => setIsOpen(false)}
>
  <div>Your custom content here</div>
</ReusableModal>
```

### Full Screen Modal

```tsx
<ReusableModal
  open={isOpen}
  size="full"
  title="Full Screen Dashboard"
  onClose={() => setIsOpen(false)}
  maxHeight="90vh"
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Your dashboard content */}
  </div>
</ReusableModal>
```

### Modal with Custom Behavior

```tsx
<ReusableModal
  open={isOpen}
  size="lg"
  title="Important Action"
  onClose={() => setIsOpen(false)}
  onConfirm={() => setIsOpen(false)}
  closeOnOverlayClick={false} // Prevent closing by clicking outside
  closeOnEscape={false} // Prevent closing with Escape key
  scrollable={true}
  maxHeight="70vh"
>
  <div>This modal requires explicit user action to close</div>
</ReusableModal>
```

### Modal without Footer

```tsx
<ReusableModal
  open={isOpen}
  title="Information"
  onClose={() => setIsOpen(false)}
  hideFooter={true}
>
  <div>This modal has no action buttons</div>
</ReusableModal>
```

## Props Reference

### Core Props

| Prop          | Type        | Default | Description                             |
| ------------- | ----------- | ------- | --------------------------------------- |
| `open`        | `boolean`   | -       | Controls modal visibility               |
| `size`        | `ModalSize` | `"md"`  | Predefined size variant                 |
| `customWidth` | `string`    | -       | Custom width (use with `size="custom"`) |
| `title`       | `string`    | -       | Modal title                             |
| `description` | `string`    | -       | Modal description                       |
| `children`    | `ReactNode` | -       | Modal content                           |

### Action Props

| Prop          | Type         | Default     | Description                           |
| ------------- | ------------ | ----------- | ------------------------------------- |
| `onClose`     | `() => void` | -           | Called when modal closes              |
| `onConfirm`   | `() => void` | -           | Called when confirm button is clicked |
| `confirmText` | `string`     | `"Confirm"` | Confirm button text                   |
| `cancelText`  | `string`     | `"Cancel"`  | Cancel button text                    |
| `loading`     | `boolean`    | `false`     | Shows loading state                   |

### Behavior Props

| Prop                  | Type      | Default  | Description                       |
| --------------------- | --------- | -------- | --------------------------------- |
| `closeOnOverlayClick` | `boolean` | `true`   | Allow closing by clicking outside |
| `closeOnEscape`       | `boolean` | `true`   | Allow closing with Escape key     |
| `centered`            | `boolean` | `true`   | Center modal on screen            |
| `scrollable`          | `boolean` | `true`   | Enable content scrolling          |
| `maxHeight`           | `string`  | `"80vh"` | Maximum height of modal           |

### Display Props

| Prop               | Type      | Default | Description              |
| ------------------ | --------- | ------- | ------------------------ |
| `hideFooter`       | `boolean` | `false` | Hide footer with buttons |
| `hideCancelButton` | `boolean` | `false` | Hide cancel button       |
| `hideButtons`      | `boolean` | `false` | Hide all footer buttons  |

## Best Practices

### 1. Choose Appropriate Sizes

- Use `xs` or `sm` for simple confirmations
- Use `md` or `lg` for forms and content display
- Use `xl` or `2xl` for complex layouts
- Use `full` for dashboards or complex workflows

### 2. Handle Loading States

```tsx
const [loading, setLoading] = useState(false);

const handleConfirm = async () => {
  setLoading(true);
  try {
    await someAsyncOperation();
    setIsOpen(false);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

<ReusableModal
  open={isOpen}
  onConfirm={handleConfirm}
  loading={loading}
  confirmText={loading ? "Processing..." : "Confirm"}
/>;
```

### 3. Prevent Accidental Closures

For important actions, disable automatic closing:

```tsx
<ReusableModal
  open={isOpen}
  closeOnOverlayClick={false}
  closeOnEscape={false}
  // User must explicitly use buttons to close
/>
```

### 4. Responsive Content

Design your modal content to work well on all screen sizes:

```tsx
<ReusableModal open={isOpen} size="xl">
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Responsive grid layout */}
    </div>
  </div>
</ReusableModal>
```

### 5. Accessibility

The component includes built-in accessibility features:

- ARIA labels and descriptions
- Keyboard navigation (Tab, Escape)
- Focus management
- Screen reader support

## Migration from Old Version

If you're upgrading from the previous version:

```tsx
// Old version
<ReusableModal
  open={isOpen}
  fullScreen={true}  // ❌ Deprecated
  // ... other props
/>

// New version
<ReusableModal
  open={isOpen}
  size="full"        // ✅ New size prop
  // ... other props
/>
```

## Examples

See `ReusableModal.example.tsx` for comprehensive usage examples including:

- All size variants
- Custom width modals
- Full-screen modals
- Modals with custom behavior
- Modals without footers

## Performance Considerations

- The modal uses React Portal for proper rendering
- Content is only rendered when `open={true}`
- Smooth animations are handled by Radix UI
- No unnecessary re-renders with proper prop optimization
