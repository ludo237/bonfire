<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        return $user->getKey() === $model->getKey() || $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can deactivate the model.
     */
    public function deactivate(User $user, User $model): bool
    {
        if ($user->getKey() === $model->getKey()) {
            return false;
        }

        return $user->isAdmin();
    }

    /**
     * Determine whether the user can activate the model.
     */
    public function activate(User $user, User $model): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can manage admin roles.
     */
    public function manageRole(User $user, User $model): bool
    {
        if ($user->getKey() === $model->getKey()) {
            return false;
        }

        return $user->isAdmin();
    }
}
