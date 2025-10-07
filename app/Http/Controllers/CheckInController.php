<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationResource;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CheckInController extends Controller
{
    public function index(Request $request): Response
    {
        $organizations = Organization::query()
            ->withCount(['members', 'rooms'])
            ->whereHas('members', fn (Builder $q) => $q->whereKey($request->user()->getKey()))
            ->get();

        return Inertia::render('check-in', [
            'organizations' => OrganizationResource::collection($organizations),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'organization_id' => [
                'required',
                'string',
                Rule::exists(Organization::tableName(), 'id'),
            ],
        ]);

        $organization = Organization::query()
            ->whereKey($validated['organization_id'])
            ->whereHas('members', fn (Builder $q) => $q->whereKey($request->user()->getKey()))
            ->firstOrFail();

        $request->session()->cache()->put(
            'current_organization_id',
            $organization->getKey(),
            now()->addDays(30)
        );

        return redirect()->route('organizations.show', $organization);
    }
}
