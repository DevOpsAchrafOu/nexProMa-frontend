import { Tr } from './site-data';

/**
 * Trust pages (Contact, Delivery, Returns, Terms, Privacy), EN / FR.
 * Content validated by the owner on 2026-11-21: hours 9:00–21:00, delivery 24–48 h in Salé and Rabat,
 * returns within 7 days (customer pays the return when changing their mind, store pays for defects,
 * hygiene products excluded once opened), seller Achraf, Rabat, achraf.nexproma@gmail.com.
 */
export type InfoKey = 'contact' | 'delivery' | 'returns' | 'terms' | 'privacy';
export const INFO_KEYS: InfoKey[] = ['contact', 'delivery', 'returns', 'terms', 'privacy'];

export const CONTACT = {
  phoneDisplay: '+212 7 68 80 81 46',
  email: 'achraf.nexproma@gmail.com',
  seller: 'Achraf',
  city: 'Rabat',
};

export interface InfoSection {
  h: Tr;
  /** Paragraphs or list items (shown as a list when there are several). */
  items: Tr[];
}

export interface InfoPage {
  /** Link label in the footer. */
  nav: Tr;
  title: Tr;
  intro: Tr;
  sections: InfoSection[];
}

const nb = ' ';

export const INFO: Record<InfoKey, InfoPage> = {
  contact: {
    nav: ['Contact', 'Contact'],
    title: ['Contact us', 'Nous contacter'],
    intro: [
      'A question about a product or an order? Write to us, we answer quickly.',
      `Une question sur un produit ou une commande${nb}? Écrivez-nous, on vous répond vite.`,
    ],
    sections: [
      {
        h: ['Hours', 'Horaires'],
        items: [['We answer from 9:00 to 21:00.', 'Nous répondons de 9 h à 21 h.']],
      },
      {
        h: ['Where we deliver', 'Où nous livrons'],
        items: [
          ['Salé and Rabat: free delivery within 24–48 hours.', `Salé et Rabat${nb}: livraison gratuite en 24 à 48 h.`],
          ['Témara: delivered on weekends.', `Témara${nb}: livraison le week-end.`],
          ['Other cities: ask us on WhatsApp.', `Autres villes${nb}: demandez-nous sur WhatsApp.`],
        ],
      },
      {
        h: ['Seller', 'Vendeur'],
        items: [['nexProMa, run by Achraf, Rabat, Morocco.', 'nexProMa, tenu par Achraf, Rabat, Maroc.']],
      },
    ],
  },

  delivery: {
    nav: ['Delivery', 'Livraison'],
    title: ['Delivery and payment', 'Livraison et paiement'],
    intro: [
      'You order, we confirm with you on WhatsApp, we deliver, and you pay when you receive the product.',
      'Vous commandez, on confirme avec vous sur WhatsApp, on livre, et vous payez à la réception.',
    ],
    sections: [
      {
        h: ['Delivery areas and times', 'Zones et délais'],
        items: [
          ['Salé and Rabat: free, within 24–48 hours after confirmation.', `Salé et Rabat${nb}: gratuite, en 24 à 48 h après confirmation.`],
          ['Témara: delivered on weekends.', `Témara${nb}: livraison le week-end.`],
          [
            'Other cities: we confirm on WhatsApp whether we can deliver, the time and any delivery cost, before you order.',
            `Autres villes${nb}: on vous confirme sur WhatsApp si la livraison est possible, le délai et les frais éventuels, avant la commande.`,
          ],
        ],
      },
      {
        h: ['How it works', 'Comment ça se passe'],
        items: [
          ['Send your order with the form or the cart: WhatsApp opens with your order written.', `Envoyez votre commande avec le formulaire ou le panier${nb}: WhatsApp s’ouvre avec votre commande écrite.`],
          ['We confirm your address and the delivery time with you on WhatsApp.', 'On confirme avec vous l’adresse et l’heure de livraison sur WhatsApp.'],
          ['We deliver to the address you gave.', 'On livre à l’adresse indiquée.'],
        ],
      },
      {
        h: ['Payment', 'Paiement'],
        items: [
          ['Cash on delivery: nothing to pay in advance, no bank card needed.', `Paiement en espèces à la livraison${nb}: rien à payer d’avance, pas besoin de carte bancaire.`],
          ['Check the product with your own eyes before you pay.', 'Vérifiez le produit avant de payer.'],
        ],
      },
    ],
  },

  returns: {
    nav: ['Returns', 'Retours et échanges'],
    title: ['Returns and exchanges', 'Retours et échanges'],
    intro: [
      'You have 7 days after receiving your order to change your mind.',
      'Vous avez 7 jours après la réception de votre commande pour changer d’avis.',
    ],
    sections: [
      {
        h: ['Changed your mind', 'Vous changez d’avis'],
        items: [
          ['Within 7 days after delivery (right of withdrawal, Moroccan law 31-08).', 'Dans les 7 jours après la livraison (droit de rétractation, loi marocaine 31-08).'],
          ['The product must be unused, in its original packaging, with all its accessories.', 'Le produit doit être non utilisé, dans son emballage d’origine, avec tous ses accessoires.'],
          ['The return is at your expense.', 'Les frais de retour sont à votre charge.'],
          ['Once we have checked the product, we exchange it or refund you.', 'Après vérification du produit, nous l’échangeons ou nous vous remboursons.'],
        ],
      },
      {
        h: ['Defective or wrong product', 'Produit défectueux ou non conforme'],
        items: [
          ['We exchange it or refund you, and the return is at our expense.', 'Nous l’échangeons ou nous vous remboursons, et le retour est à notre charge.'],
          ['Tell us within 7 days, with a photo or a video of the problem.', 'Prévenez-nous dans les 7 jours, avec une photo ou une vidéo du problème.'],
        ],
      },
      {
        h: ['Products that cannot be returned once opened', 'Produits non repris une fois ouverts'],
        items: [
          [
            'For hygiene reasons, the anti-snoring nose clip, the electric toothbrush and the ear cleaner cannot be returned once the packaging is opened, unless they are defective.',
            'Pour des raisons d’hygiène, le pince-nez anti-ronflement, la brosse à dents électrique et le nettoyeur d’oreilles ne sont pas repris une fois l’emballage ouvert, sauf s’ils sont défectueux.',
          ],
        ],
      },
      {
        h: ['How to return a product', 'Comment retourner un produit'],
        items: [
          ['Send us a WhatsApp message with your name, the product and a photo.', 'Envoyez-nous un message WhatsApp avec votre nom, le produit et une photo.'],
          ['We tell you how to send or hand over the product, and organise the exchange or refund with you.', 'On vous indique comment renvoyer ou remettre le produit, et on organise avec vous l’échange ou le remboursement.'],
        ],
      },
    ],
  },

  terms: {
    nav: ['Terms of sale', 'Conditions de vente'],
    title: ['Terms of sale', 'Conditions générales de vente'],
    intro: [
      'These terms apply to orders placed on this site with nexProMa.',
      'Ces conditions s’appliquent aux commandes passées sur ce site auprès de nexProMa.',
    ],
    sections: [
      {
        h: ['Seller', 'Vendeur'],
        items: [['nexProMa, run by Achraf, Rabat, Morocco. Contact: WhatsApp and e-mail on the Contact page.', 'nexProMa, tenu par Achraf, Rabat, Maroc. Contact : WhatsApp et e-mail sur la page Contact.']],
      },
      {
        h: ['Prices', 'Prix'],
        items: [
          ['Prices are in Moroccan dirhams (MAD), shown on each product.', 'Les prix sont en dirhams marocains (DH), indiqués sur chaque produit.'],
          ['Delivery is free in Salé and Rabat. For other cities, any cost is confirmed before the order.', 'La livraison est gratuite à Salé et Rabat. Pour les autres villes, les frais éventuels sont confirmés avant la commande.'],
        ],
      },
      {
        h: ['Order', 'Commande'],
        items: [
          ['You send your order on WhatsApp with the form or the cart.', 'Vous envoyez votre commande sur WhatsApp avec le formulaire ou le panier.'],
          ['The order is final once we have confirmed it with you on WhatsApp (products, total, address, time).', 'La commande est ferme une fois confirmée avec vous sur WhatsApp (produits, total, adresse, heure).'],
        ],
      },
      {
        h: ['Payment and delivery', 'Paiement et livraison'],
        items: [['Cash on delivery. Areas and times are on the Delivery page.', 'Paiement en espèces à la livraison. Zones et délais sur la page Livraison.']],
      },
      {
        h: ['Returns and after-sales', 'Retours et service après-vente'],
        items: [
          ['Returns within 7 days, under the conditions of the Returns page.', 'Retours sous 7 jours, aux conditions de la page Retours et échanges.'],
          ['After-sales support on WhatsApp, 24/7.', 'Service après-vente sur WhatsApp, 24h/24, 7j/7.'],
        ],
      },
      {
        h: ['Applicable law', 'Droit applicable'],
        items: [['These terms are governed by Moroccan law, including law 31-08 on consumer protection.', 'Ces conditions sont soumises au droit marocain, notamment à la loi 31-08 sur la protection du consommateur.']],
      },
    ],
  },

  privacy: {
    nav: ['Privacy', 'Confidentialité'],
    title: ['Privacy', 'Confidentialité'],
    intro: [
      'We only ask for what we need to deliver your order, and we never sell it.',
      'Nous ne demandons que ce qu’il faut pour livrer votre commande, et nous ne le revendons jamais.',
    ],
    sections: [
      {
        h: ['What we receive', 'Ce que nous recevons'],
        items: [
          ['Your name, phone number, city and, if you give it, your address, when you send an order on WhatsApp.', 'Votre nom, votre téléphone, votre ville et, si vous l’indiquez, votre adresse, quand vous envoyez une commande sur WhatsApp.'],
          ['The site itself stores nothing on a server: the form only opens WhatsApp with your message.', 'Le site lui-même n’enregistre rien sur un serveur : le formulaire ouvre simplement WhatsApp avec votre message.'],
        ],
      },
      {
        h: ['Why', 'Pourquoi'],
        items: [['Only to confirm and deliver your order, and for after-sales support.', 'Uniquement pour confirmer et livrer votre commande, et pour le service après-vente.']],
      },
      {
        h: ['In your browser', 'Dans votre navigateur'],
        items: [
          ['Your cart, favorites and recently viewed products are saved only on your device. Clearing your browser data removes them.', 'Votre panier, vos favoris et les produits consultés sont gardés uniquement sur votre appareil. Effacer les données de votre navigateur les supprime.'],
          ['No advertising cookies. The site loads its font from Google Fonts.', 'Pas de cookies publicitaires. Le site charge sa police depuis Google Fonts.'],
        ],
      },
      {
        h: ['Your rights', 'Vos droits'],
        items: [['Under Moroccan law 09-08, you can ask to see, correct or delete your data: write to us on WhatsApp or by e-mail.', 'Selon la loi marocaine 09-08, vous pouvez demander à consulter, corriger ou supprimer vos données : écrivez-nous sur WhatsApp ou par e-mail.']],
      },
    ],
  },
};
