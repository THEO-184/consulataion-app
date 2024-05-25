"use client";

import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onSuccess(_data, _variables, _context, mutation) {
			queryClient.invalidateQueries({
				queryKey: mutation.options.mutationKey,
			});
		},
	}),
});

const ReactQueryClientProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default ReactQueryClientProvider;
