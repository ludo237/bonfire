<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class JoinController extends Controller
{
    public function show(string $code): Response
    {
        $account = Account::query()->first();

        if (! $account || $account->join_code !== $code) {
            abort(404);
        }

        return Inertia::render('auth/join', [
            'code' => $code,
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request, string $code): RedirectResponse
    {
        $account = Account::query()->first();

        if (! $account || $account->join_code !== $code) {
            abort(404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        try {
            $user = User::query()->create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
                'role' => 'member',
                'active' => true,
            ]);

            Auth::login($user);

            return redirect()->route('rooms.index');
        } catch (UniqueConstraintViolationException $e) {
            throw ValidationException::withMessages([
                'email' => 'This email is already registered. Please sign in instead.',
            ]);
        }
    }
}
