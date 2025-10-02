<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\SetupApplication;
use App\Models\Account;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class FirstRunController extends Controller
{
    public function __construct(
        private readonly SetupApplication $setupApplication,
    ) {}

    public function show(): Response|RedirectResponse
    {
        if (Account::exists()) {
            return redirect()->route('welcome');
        }

        return Inertia::render('auth/first-run');
    }

    /**
     * @throws Throwable
     */
    public function store(Request $request): RedirectResponse
    {
        if (Account::exists()) {
            return redirect()->route('welcome');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = $this->setupApplication->handle($validated);

        Auth::login($user);

        return redirect()->route('rooms.index');
    }
}
