<?php

namespace Database\Seeders;

use App\Models\Partner;
use App\Models\Service;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Services
        $services = [
            [
                'title' => 'Financement de projets',
                'description' => 'Structuration et accès aux marchés de capitaux locaux et internationaux',
                'icon_name' => 'Landmark',
            ],
            [
                'title' => 'Fusions & Acquisitions',
                'description' => 'Accompagnement buy-side & sell-side, négociation et closing',
                'icon_name' => 'Handshake',
            ],
            [
                'title' => 'Restructuration',
                'description' => 'Optimisation bilancielle, refinancement, plans de redressement',
                'icon_name' => 'RefreshCcw',
            ],
            [
                'title' => 'Conseil stratégique',
                'description' => 'Business plan, valorisation, préparation à l\'investissement',
                'icon_name' => 'Target',
            ],
        ];

        foreach ($services as $index => $service) {
            Service::create([
                'title' => $service['title'],
                'slug' => Str::slug($service['title']),
                'description' => $service['description'],
                'icon_name' => $service['icon_name'],
                'sort_order' => $index,
            ]);
        }

        // Équipe
        $team = [
            ['name' => 'Christelle BASILUA SEMY', 'role_title' => 'Directrice Générale'],
            ['name' => 'Suzick TOMA', 'role_title' => 'Directrice de mission'],
            ['name' => 'Louis-Raymond GOMES', 'role_title' => 'Conseiller Juridique'],
            ['name' => 'Sarah BONANA', 'role_title' => 'Assistante Exécutive'],
        ];

        foreach ($team as $index => $member) {
            TeamMember::create([
                'name' => $member['name'],
                'role_title' => $member['role_title'],
                'sort_order' => $index,
            ]);
        }

        // Partenaires
        $partners = [
            ['name' => 'OMYA INVEST', 'logo_path' => null],
            ['name' => 'AKIENI', 'logo_path' => 'partners/akieni.png'],
            ['name' => 'BGFI', 'logo_path' => 'partners/bgfi-bank.jpeg'],
        ];

        foreach ($partners as $index => $partner) {
            Partner::create([
                'name' => $partner['name'],
                'logo_path' => $partner['logo_path'],
                'sort_order' => $index,
            ]);
        }
    }
}
