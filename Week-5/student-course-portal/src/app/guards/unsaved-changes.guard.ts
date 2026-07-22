import { CanDeactivateFn } from '@angular/router';

export interface DirtyFormComponent {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<DirtyFormComponent> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  return window.confirm('You have unsaved changes. Leave?');
};
