<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #0B1F33;">
    <h2>Nouveau message reçu depuis le formulaire de contact — OMYA CAPITAL</h2>
    <p><strong>Nom :</strong> {{ $contactMessage->name }}</p>
    <p><strong>E-mail :</strong> {{ $contactMessage->email }}</p>
    @if ($contactMessage->phone)
        <p><strong>Téléphone :</strong> {{ $contactMessage->phone }}</p>
    @endif
    @if ($contactMessage->subject)
        <p><strong>Objet :</strong> {{ $contactMessage->subject }}</p>
    @endif
    <p><strong>Message :</strong></p>
    <p>{{ $contactMessage->message }}</p>
</body>
</html>
