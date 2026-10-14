<?php

/**
 * French validation messages.
 *
 * The application runs with APP_LOCALE=fr and shipped with no language files
 * at all, so every validation failure rendered as its raw key — the contact
 * form showed "validation.required" and "validation.email" to visitors.
 *
 * Only the rules the application actually uses are translated here; anything
 * else falls back to the published English file, which is readable, rather
 * than to a raw key.
 */

return [
    'required' => 'Le champ :attribute est obligatoire.',
    'email' => 'Le champ :attribute doit être une adresse e-mail valide.',
    'string' => 'Le champ :attribute doit être du texte.',
    'max' => [
        'string' => 'Le champ :attribute ne peut pas dépasser :max caractères.',
        'numeric' => 'Le champ :attribute ne peut pas être supérieur à :max.',
        'file' => 'Le fichier :attribute ne peut pas dépasser :max kilo-octets.',
        'array' => 'Le champ :attribute ne peut pas contenir plus de :max éléments.',
    ],

    /** Field names as a visitor would call them, not as the database does. */
    'attributes' => [
        'name' => 'nom complet',
        'email' => 'adresse e-mail',
        'phone' => 'téléphone',
        'subject' => 'objet',
        'message' => 'message',
    ],
];
